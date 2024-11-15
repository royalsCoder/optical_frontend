import React, { useContext, useEffect, useState } from 'react'
import { adddata } from './context/ContestProvider';
import axios from 'axios';

const LastStock = () => {
    const [oneYearCompleteData, birthdata, lastStockData] = useContext(adddata);

    // const [data, setData] = useState(null)
    // const oneYearComplete = async () => {
    //     try {
    //         const res = await axios.get(
    //             `${process.env.REACT_APP_BASE_URL}/quantity-range`
    //         );
    //         console.log("res", res?.data);

    //         setData(res?.data);
    //     } catch (error) {
    //         console.log(error);

    //     }
    // };
    // useEffect(() => {
    //     oneYearComplete();
    // }, [])

    return (
        <>
            <div>
                <div style={{ width: "90%", margin: "auto" }} className='row my-4'>
                    <>
                        <p>LastStock</p>
                        {
                            lastStockData?.map((item, index) => {
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

                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </>
                </div>
            </div>
        </>
    )
}

export default LastStock

