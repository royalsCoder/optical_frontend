import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Empty, Modal } from 'antd';
import { toast } from 'react-toastify';
import { MagnifyingGlass } from 'react-loader-spinner';
const Stock = () => {

    const [getusedata, setuserdata] = useState([]);
    const [loading, setLoading] = useState(false);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);

    const [modalData, setModalData] = useState("")


    const [formData, setFormData] = useState(

        modalData ? {
            ...modalData
        } :
            {
                itemName: "",
                category: "",
                modelNumber: "",
                quantity: "",
                price: ""
            })

    const onchangeformData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addStockData = (e) => {
        e.preventDefault();

        axios.post(modalData ? `${process.env.REACT_APP_BASE_URL}/updateStock/${modalData?._id}` : `${process.env.REACT_APP_BASE_URL}/addStock`, formData).then((res) => {
            console.log(res.data);
            setUpdateStatus(prev => !prev)
            toast.success('stock added')
            setIsModalOpen(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    const editStock = (item) => {
        console.log("item edit", item);
        setModalData(item)
        setIsModalOpen(true);
    }

    const getdata = async () => {
        setLoading(true)
        try {
            const resdata = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/getStock`,

            );
            setLoading(false)

            setuserdata(resdata?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            navigator("/login");
            setLoading(false);
        }
    };
    const getframes = async () => {
        setLoading(true)
        try {
            const resdata = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/getframes`,

            );

            setuserdata(resdata?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);
        }
    };
    const getLences = async () => {
        setLoading(true)
        try {
            const resdata = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/getLenses`,

            );
            console.log("resdata", resdata);
            setuserdata(resdata?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);
        }
    };

    useEffect(() => {
        getdata()
    }, [updateStatus])
    return (

        <>
            <div>
                <div style={{ width: "90%", margin: "auto" }} className='row my-4'>
                    <div className='col d-flex gap-2'>
                        <button onClick={() => getLences()} className='btn btn-primary'>
                            Lens</button>
                        <button onClick={() => getframes()} className='btn btn-primary'>
                            Frames</button>
                        <button onClick={() => getdata()} className='btn btn-primary'>
                            All</button>
                    </div>
                    <div className='col text-end'>
                        <button onClick={showModal} className='btn btn-primary'>
                            Add Stock</button>
                    </div>

                </div>

                <div style={{ width: "90%", margin: "auto" }} className='row my-4'>
                    {
                        !loading ?
                            <>
                                {
                                    getusedata?.length == 0 ?
                                        <>
                                            <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "80vh" }}>
                                                <Empty />
                                            </div>
                                        </>
                                        : <>

                                            {
                                                getusedata?.map((item, index) => {
                                                    return (
                                                        <>
                                                            <div className='col-3 my-2 '>
                                                                <div className='card p-3'>
                                                                    <h5>Category: {item?.category}</h5>
                                                                    <p className='m-0'>itemName: {item?.itemName}</p>
                                                                    <p className='m-0'>modelNumber: {item?.modelNumber}</p>
                                                                    <p className='m-0'>price: {item?.price}</p>
                                                                    <p className='m-0'>quantity: {item?.quantity}</p>
                                                                    <p className='m-0'>sellQuantity: {item?.sellQuantity}</p>
                                                                    <div className='text-end'>
                                                                        <button onClick={() => editStock(item)} className='btn btn-primary'>Edit</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                }
                            </>
                            :
                            <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "80vh" }}>

                                <MagnifyingGlass
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="magnifying-glass-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="magnifying-glass-wrapper"
                                    glassColor="#c0efff"
                                    color="#e15b64"
                                />
                            </div>
                    }

                </div>
            </div>


            <Modal footer title={modalData ? "Edit Stock" : "Add Stock"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <form>
                    <div class="form-group">
                        <label for="Category">Category</label>
                        <select name='category' value={formData?.category} onChange={onchangeformData} class="form-control" id="Category">
                            <option value="frame">frame</option>
                            <option value="lens">lens</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="itemName">Item Name</label>
                        <input type="text" name='itemName' value={formData?.itemName} onChange={onchangeformData} class="form-control" id="itemName" placeholder="itemName" />
                    </div>
                    <div class="form-group">
                        <label for="modelNumber">model Number</label>
                        <input name='modelNumber' value={formData?.modelNumber} onChange={onchangeformData} type="text" class="form-control" id="modelNumber" placeholder="model Number" />
                    </div>
                    <div class="form-group">
                        <label for="quantity">quantity</label>
                        <input name='quantity' value={formData?.quantity} onChange={onchangeformData} type="number" class="form-control" id="quantity" placeholder="quantity" />
                    </div>
                    <div class="form-group">
                        <label for="Price">Price</label>
                        <input name='price' value={formData?.price} onChange={onchangeformData} type="number" class="form-control" id="Price" placeholder="Price" />
                    </div>

                    <div className='text-end'>
                        <button onClick={addStockData} className='btn btn-primary'>Save</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Stock
