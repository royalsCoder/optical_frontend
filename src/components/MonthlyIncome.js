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
  Space
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
  
  // Store dates as strings in DD/MM/YYYY format
  const [startDate, setStartDate] = useState(
    moment().startOf('month').format('DD/MM/YYYY')
  );
  const [endDate, setEndDate] = useState(
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

  // Validate and convert date format
  const validateAndConvertDate = (dateStr) => {
    if (!dateStr) return null;
    
    // Try parsing as DD/MM/YYYY
    const date = moment(dateStr, 'DD/MM/YYYY', true);
    if (date.isValid()) {
      return date.format('YYYY-MM-DD');
    }
    
    // Try parsing as other formats
    const altDate = moment(dateStr);
    if (altDate.isValid()) {
      return altDate.format('YYYY-MM-DD');
    }
    
    return null;
  };

  const fetchData = async () => {
    try {
      const formattedStartDate = validateAndConvertDate(startDate);
      const formattedEndDate = validateAndConvertDate(endDate);
      
      if (!formattedStartDate || !formattedEndDate) {
        message.error('Invalid date format. Please use DD/MM/YYYY format');
        return;
      }
      
      if (moment(formattedEndDate).isBefore(formattedStartDate)) {
        message.error('End date cannot be before start date');
        return;
      }

      setLoading(true);
      
      console.log('Fetching data for:', formattedStartDate, 'to', formattedEndDate);
      
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/custom?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
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
    setStartDate(value);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
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
        ['Date Range', `${startDate} to ${endDate}`],
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
    setStartDate(moment().startOf('month').format('DD/MM/YYYY'));
    setEndDate(moment().endOf('month').format('DD/MM/YYYY'));
    
    setFilters({
      sortBy: 'date_desc',
      pageSize: 10
    });
    
    fetchData();
  };

  // Set quick date ranges
  const setQuickDateRange = (type) => {
    let start, end;
    
    switch(type) {
      case 'today':
        start = moment();
        end = moment();
        break;
      case 'yesterday':
        start = moment().subtract(1, 'day');
        end = moment().subtract(1, 'day');
        break;
      case 'thisWeek':
        start = moment().startOf('week');
        end = moment().endOf('week');
        break;
      case 'lastWeek':
        start = moment().subtract(1, 'week').startOf('week');
        end = moment().subtract(1, 'week').endOf('week');
        break;
      case 'thisMonth':
        start = moment().startOf('month');
        end = moment().endOf('month');
        break;
      case 'lastMonth':
        start = moment().subtract(1, 'month').startOf('month');
        end = moment().subtract(1, 'month').endOf('month');
        break;
      case 'thisYear':
        start = moment().startOf('year');
        end = moment().endOf('year');
        break;
      case 'lastYear':
        start = moment().subtract(1, 'year').startOf('year');
        end = moment().subtract(1, 'year').endOf('year');
        break;
      case 'last7Days':
        end = moment();
        start = moment().subtract(6, 'days');
        break;
      case 'last30Days':
        end = moment();
        start = moment().subtract(29, 'days');
        break;
      default:
        return;
    }
    
    setStartDate(start.format('DD/MM/YYYY'));
    setEndDate(end.format('DD/MM/YYYY'));
    message.info(`Date range set to ${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}. Click "Apply" to fetch data.`);
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
                {startDate} - {endDate}
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
              <label className="filter-label">From Date</label>
              <Input
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="DD/MM/YYYY"
                suffix={<CalendarOutlined />}
                style={{ width: '100%' }}
                addonBefore={<span style={{ fontSize: '12px' }}>DD/MM/YYYY</span>}
              />
            </div>
          </Col>
          
          <Col xs={24} md={12} lg={6}>
            <div className="filter-item">
              <label className="filter-label">To Date</label>
              <Input
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="DD/MM/YYYY"
                suffix={<CalendarOutlined />}
                style={{ width: '100%' }}
                addonBefore={<span style={{ fontSize: '12px' }}>DD/MM/YYYY</span>}
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
        <div style={{ marginTop: 16 }}>
          <label className="filter-label" style={{ marginBottom: 8, display: 'block' }}>
            Quick Date Ranges:
          </label>
          <Space wrap size={[8, 8]} style={{ width: '100%' }}>
            <Button size="small" onClick={() => setQuickDateRange('today')}>Today</Button>
            <Button size="small" onClick={() => setQuickDateRange('yesterday')}>Yesterday</Button>
            <Button size="small" onClick={() => setQuickDateRange('thisWeek')}>This Week</Button>
            <Button size="small" onClick={() => setQuickDateRange('lastWeek')}>Last Week</Button>
            <Button size="small" onClick={() => setQuickDateRange('thisMonth')}>This Month</Button>
            <Button size="small" onClick={() => setQuickDateRange('lastMonth')}>Last Month</Button>
            <Button size="small" onClick={() => setQuickDateRange('thisYear')}>This Year</Button>
            <Button size="small" onClick={() => setQuickDateRange('lastYear')}>Last Year</Button>
            <Button size="small" onClick={() => setQuickDateRange('last7Days')}>Last 7 Days</Button>
            <Button size="small" onClick={() => setQuickDateRange('last30Days')}>Last 30 Days</Button>
          </Space>
        </div>
        
        {/* Date Format Help */}
        <div style={{ marginTop: 12, padding: 8, backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 4 }}>
          <small style={{ color: '#52c41a' }}>
            💡 <strong>Note:</strong> Enter dates in <code>DD/MM/YYYY</code> format (e.g., 25/12/2023)
          </small>
        </div>
      </Card>

      <Card className="data-table-card">
        <div className="table-header">
          <div className="table-title">
            <h3>Income Records</h3>
            <span className="record-count">
              {data.length} records for {startDate} to {endDate}
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