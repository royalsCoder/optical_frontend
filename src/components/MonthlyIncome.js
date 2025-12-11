import React, { useEffect, useState, useMemo } from "react";
import { 
  Table, 
  Card, 
  Row, 
  Col, 
  Button, 
  Statistic,
  Spin,
  message,
  Select,
  Tag,
  Input,
  Space,
  Popover,
  DatePicker as AntDatePicker,
  ConfigProvider
} from "antd";
import {
  DownloadOutlined,
  FilterOutlined,
  ReloadOutlined,
  DollarOutlined,
  UserOutlined,
  PhoneOutlined,
  CalendarOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import axios from "axios";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import moment from "moment";
import "./MonthlyIncome.css";

const { Option } = Select;

const MonthlyIncome = () => {
  const token = Cookies.get("loginToken");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    totalRecords: 0,
    averageAdvance: 0
  });
  
  // Simple string format for dates
  const [startDate, setStartDate] = useState(
    moment().startOf('month').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(
    moment().endOf('month').format('YYYY-MM-DD')
  );
  
  // For display in DD/MM/YYYY format
  const [displayStartDate, setDisplayStartDate] = useState(
    moment().startOf('month').format('DD/MM/YYYY')
  );
  const [displayEndDate, setDisplayEndDate] = useState(
    moment().endOf('month').format('DD/MM/YYYY')
  );
  
  const [filters, setFilters] = useState({
    sortBy: 'date_desc',
    pageSize: 10
  });

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];
    
    switch(filters.sortBy) {
      case 'date_desc':
        result.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
        break;
      case 'date_asc':
        result.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
        break;
      case 'amount_desc':
        result.sort((a, b) => {
          const totalA = (a.frameQyt * a.frameprice) + (a.lensqyt * a.lensprice);
          const totalB = (b.frameQyt * b.frameprice) + (b.lensqyt * b.lensprice);
          return totalB - totalA;
        });
        break;
      case 'amount_asc':
        result.sort((a, b) => {
          const totalA = (a.frameQyt * a.frameprice) + (a.lensqyt * a.lensprice);
          const totalB = (b.frameQyt * b.frameprice) + (b.lensqyt * b.lensprice);
          return totalA - totalB;
        });
        break;
      case 'name_asc':
        result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        break;
    }
    
    return result;
  }, [data, filters.sortBy]);

  const fetchData = async () => {
    try {
      if (!startDate || !endDate) {
        message.warning('Please select a date range');
        return;
      }

      setLoading(true);
      
      console.log('Fetching data for:', startDate, 'to', endDate);
      
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/custom?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data) {
        const records = response.data.data || [];
        setData(records);
        
        const totalIncome = records.reduce((sum, item) => {
          const total = ((item.frameQyt || 0) * (item.frameprice || 0)) + ((item.lensqyt || 0) * (item.lensprice || 0));
          return sum + total;
        }, 0);
        
        const totalAdvance = records.reduce((sum, item) => sum + (parseFloat(item.Advance) || 0), 0);
        const avgAdvance = records.length > 0 ? totalAdvance / records.length : 0;
        
        setSummary({
          income: totalIncome,
          totalRecords: records.length,
          averageAdvance: avgAdvance
        });
        
        message.success(`Loaded ${records.length} records`);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to load data');
      setData([]);
      setSummary({
        income: 0,
        totalRecords: 0,
        averageAdvance: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setDisplayStartDate(value);
    
    // Parse DD/MM/YYYY to YYYY-MM-DD
    const parts = value.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      
      if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
        const dateStr = `${year}-${month}-${day}`;
        const date = moment(dateStr, 'YYYY-MM-DD');
        if (date.isValid()) {
          setStartDate(dateStr);
          message.info('Start date updated. Click "Apply" to fetch data.');
          return;
        }
      }
    }
    
    // If invalid, don't update the actual date
    message.error('Invalid date format. Use DD/MM/YYYY');
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setDisplayEndDate(value);
    
    // Parse DD/MM/YYYY to YYYY-MM-DD
    const parts = value.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      
      if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
        const dateStr = `${year}-${month}-${day}`;
        const date = moment(dateStr, 'YYYY-MM-DD');
        if (date.isValid()) {
          setEndDate(dateStr);
          message.info('End date updated. Click "Apply" to fetch data.');
          return;
        }
      }
    }
    
    // If invalid, don't update the actual date
    message.error('Invalid date format. Use DD/MM/YYYY');
  };

  const downloadExcel = () => {
    if (data.length === 0) {
      message.warning('No data to download');
      return;
    }

    try {
      const excelData = filteredAndSortedData.map((item, index) => ({
        'Sr. No': index + 1,
        'Customer Name': item.name || 'N/A',
        'Mobile Number': item.number || 'N/A',
        'Date': moment(item.date).isValid() ? moment(item.date).format('DD/MM/YYYY') : 'N/A',
        'Advance Amount': item.Advance || 0,
        'Total Amount': ((item.frameQyt || 0) * (item.frameprice || 0)) + ((item.lensqyt || 0) * (item.lensprice || 0)),
        'Balance': ((item.frameQyt || 0) * (item.frameprice || 0)) + ((item.lensqyt || 0) * (item.lensprice || 0)) - (item.Advance || 0),
        'Payment Mode': item.ModeOfPayment || 'N/A'
      }));

      const ws = XLSX.utils.json_to_sheet(excelData);
      
      const wscols = [
        { wch: 8 },
        { wch: 20 },
        { wch: 15 },
        { wch: 12 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 }
      ];
      ws['!cols'] = wscols;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Monthly Income Report');
      
      const summaryData = [
        ['Summary Report'],
        [''],
        ['Date Range', `${displayStartDate} to ${displayEndDate}`],
        ['Total Records', summary.totalRecords],
        ['Total Income', `₹${summary.income.toLocaleString()}`],
        ['Average Advance', `₹${summary.averageAdvance.toFixed(2)}`],
        [''],
        ['Generated On', moment().format('DD/MM/YYYY HH:mm:ss')]
      ];
      
      const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');
      
      const fileName = `Monthly_Income_Report_${moment().format('YYYY-MM-DD')}.xlsx`;
      
      XLSX.writeFile(wb, fileName);
      message.success('Report downloaded successfully');
    } catch (error) {
      console.error('Error downloading Excel:', error);
      message.error('Failed to download report');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    const start = moment().startOf('month').format('YYYY-MM-DD');
    const end = moment().endOf('month').format('YYYY-MM-DD');
    const displayStart = moment().startOf('month').format('DD/MM/YYYY');
    const displayEnd = moment().endOf('month').format('DD/MM/YYYY');
    
    setStartDate(start);
    setEndDate(end);
    setDisplayStartDate(displayStart);
    setDisplayEndDate(displayEnd);
    
    setFilters({
      sortBy: 'date_desc',
      pageSize: 10
    });
    
    fetchData();
  };

  // Quick date setter functions
  const setDateRange = (start, end) => {
    setStartDate(start.format('YYYY-MM-DD'));
    setEndDate(end.format('YYYY-MM-DD'));
    setDisplayStartDate(start.format('DD/MM/YYYY'));
    setDisplayEndDate(end.format('DD/MM/YYYY'));
    message.info('Date range updated. Click "Apply" to fetch data.');
  };

  // Initial load
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Sr. No',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: 80,
      align: 'center'
    },
    {
      title: (
        <div className="column-header">
          <UserOutlined />
          <span>Customer Name</span>
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text) => text || 'N/A',
      width: 200
    },
    {
      title: (
        <div className="column-header">
          <PhoneOutlined />
          <span>Mobile Number</span>
        </div>
      ),
      dataIndex: 'number',
      key: 'number',
      render: (text) => text || 'N/A',
      width: 150
    },
    {
      title: (
        <div className="column-header">
          <CalendarOutlined />
          <span>Date</span>
        </div>
      ),
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).isValid() ? moment(text).format('DD/MM/YYYY') : 'N/A',
      width: 120
    },
    {
      title: (
        <div className="column-header">
          <DollarOutlined />
          <span>Advance Amount</span>
        </div>
      ),
      dataIndex: 'Advance',
      key: 'Advance',
      render: (amount) => `₹${parseInt(amount || 0).toLocaleString()}`,
      width: 150
    },
    {
      title: (
        <div className="column-header">
          <DollarOutlined />
          <span>Total Amount</span>
        </div>
      ),
      key: 'total',
      render: (record) => {
        const total = ((record.frameQyt || 0) * (record.frameprice || 0)) + ((record.lensqyt || 0) * (record.lensprice || 0));
        return `₹${total.toLocaleString()}`;
      },
      width: 150
    },
    {
      title: 'Balance',
      key: 'balance',
      render: (record) => {
        const total = ((record.frameQyt || 0) * (record.frameprice || 0)) + ((record.lensqyt || 0) * (record.lensprice || 0));
        const balance = total - (record.Advance || 0);
        const isPaid = balance <= 0;
        
        return (
          <div className={isPaid ? 'paid' : 'pending'}>
            <span>₹{balance.toLocaleString()}</span>
            {isPaid ? (
              <Tag color="success" style={{ marginLeft: 8 }}>Paid</Tag>
            ) : (
              <Tag color="warning" style={{ marginLeft: 8 }}>Pending</Tag>
            )}
          </div>
        );
      },
      width: 150
    }
  ];

  return (
    <div className="monthly-income-container">
      <div className="header-section">
        <div className="header-left">
          <BarChartOutlined className="header-icon" />
          <div>
            <h1 className="page-title">Monthly Income Report</h1>
            <p className="page-subtitle">Track and analyze your income data</p>
          </div>
        </div>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={fetchData}
          loading={loading}
          className="refresh-btn"
        >
          Refresh
        </Button>
      </div>

      <Row gutter={[16, 16]} className="summary-cards">
        <Col xs={24} sm={8} lg={8}>
          <Card className="summary-card">
            <Statistic
              title="Total Income"
              value={summary.income}
              prefix="₹"
              valueStyle={{ color: '#3f8600' }}
            />
            <div className="card-footer">
              <span>
                {displayStartDate} - {displayEndDate}
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8} lg={8}>
          <Card className="summary-card">
            <Statistic
              title="Total Records"
              value={summary.totalRecords}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="card-footer">
              <span>{data.length} records loaded</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8} lg={8}>
          <Card className="summary-card">
            <Statistic
              title="Average Advance"
              value={summary.averageAdvance}
              prefix="₹"
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="card-footer">
              <span>Per customer</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Card className="filters-card">
        <div className="filters-header">
          <FilterOutlined />
          <h3>Filters & Options</h3>
        </div>
        
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12} lg={6}>
            <div className="filter-item">
              <label className="filter-label">From Date (DD/MM/YYYY)</label>
              <Input
                value={displayStartDate}
                onChange={handleStartDateChange}
                placeholder="DD/MM/YYYY"
                suffix={<CalendarOutlined />}
                style={{ width: '100%' }}
              />
            </div>
          </Col>
          
          <Col xs={24} md={12} lg={6}>
            <div className="filter-item">
              <label className="filter-label">To Date (DD/MM/YYYY)</label>
              <Input
                value={displayEndDate}
                onChange={handleEndDateChange}
                placeholder="DD/MM/YYYY"
                suffix={<CalendarOutlined />}
                style={{ width: '100%' }}
              />
            </div>
          </Col>
          
          <Col xs={24} md={6} lg={4}>
            <div className="filter-item">
              <label className="filter-label">Sort By</label>
              <Select
                value={filters.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
                className="filter-select"
                style={{ width: '100%' }}
              >
                <Option value="date_desc">Date (Newest First)</Option>
                <Option value="date_asc">Date (Oldest First)</Option>
                <Option value="amount_desc">Amount (High to Low)</Option>
                <Option value="amount_asc">Amount (Low to High)</Option>
                <Option value="name_asc">Name (A-Z)</Option>
              </Select>
            </div>
          </Col>
          
          <Col xs={24} md={6} lg={4}>
            <div className="filter-item">
              <label className="filter-label">Records</label>
              <Select
                value={filters.pageSize}
                onChange={(value) => handleFilterChange('pageSize', value)}
                className="filter-select"
                style={{ width: '100%' }}
              >
                <Option value={10}>10 per page</Option>
                <Option value={25}>25 per page</Option>
                <Option value={50}>50 per page</Option>
                <Option value={100}>100 per page</Option>
              </Select>
            </div>
          </Col>
          
          <Col xs={24} md={4} lg={3}>
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={fetchData}
              loading={loading}
              block
              className="apply-filter-btn"
            >
              Apply
            </Button>
          </Col>
          
          <Col xs={24} md={4} lg={3}>
            <Button
              icon={<ReloadOutlined />}
              onClick={resetFilters}
              block
              className="reset-filter-btn"
            >
              Reset
            </Button>
          </Col>
          
          <Col xs={24} md={4} lg={4}>
            <Button
              type="default"
              icon={<DownloadOutlined />}
              onClick={downloadExcel}
              disabled={data.length === 0}
              block
              className="download-excel-btn"
            >
              Export Excel
            </Button>
          </Col>
        </Row>
        
        {/* Quick Date Buttons */}
        <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
          <Col xs={12} sm={6} lg={3}>
            <Button
              size="small"
              onClick={() => {
                const start = moment().startOf('month');
                const end = moment().endOf('month');
                setDateRange(start, end);
              }}
              block
            >
              This Month
            </Button>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Button
              size="small"
              onClick={() => {
                const start = moment().subtract(1, 'month').startOf('month');
                const end = moment().subtract(1, 'month').endOf('month');
                setDateRange(start, end);
              }}
              block
            >
              Last Month
            </Button>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Button
              size="small"
              onClick={() => {
                const start = moment().startOf('year');
                const end = moment().endOf('year');
                setDateRange(start, end);
              }}
              block
            >
              This Year
            </Button>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Button
              size="small"
              onClick={() => {
                const end = moment();
                const start = moment().subtract(7, 'days');
                setDateRange(start, end);
              }}
              block
            >
              Last 7 Days
            </Button>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Button
              size="small"
              onClick={() => {
                const end = moment();
                const start = moment().subtract(30, 'days');
                setDateRange(start, end);
              }}
              block
            >
              Last 30 Days
            </Button>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Button
              size="small"
              onClick={() => {
                const start = moment().subtract(1, 'year').startOf('year');
                const end = moment().subtract(1, 'year').endOf('year');
                setDateRange(start, end);
              }}
              block
            >
              Last Year
            </Button>
          </Col>
        </Row>
      </Card>

      <Card className="data-table-card">
        <div className="table-header">
          <div className="table-title">
            <h3>Income Records</h3>
            <span className="record-count">
              {data.length} records for {displayStartDate} to {displayEndDate}
            </span>
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="loading-container">
              <Spin size="large" tip="Loading income data..." />
            </div>
          ) : data.length === 0 ? (
            <div className="no-data-container">
              <div className="no-data-icon">📊</div>
              <h4>No Income Data Found</h4>
              <p>Select date range and click Apply</p>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredAndSortedData}
              rowKey="_id"
              pagination={{
                pageSize: filters.pageSize,
                showSizeChanger: false,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} records`,
                className: 'custom-pagination'
              }}
              scroll={{ x: 800 }}
              className="income-table"
              rowClassName={(record, index) => 
                index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
              }
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default MonthlyIncome;