"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useraction'
import { useSearchParams } from 'next/navigation'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';
import { notFound } from "next/navigation"
// import payments from 'razorpay/dist/types/payments'


const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({name:"",message:"",amount:""})
    const [currentuser, setcurrentuser] = useState({})
    const [Payments, setPayments] = useState([])
    const searchParams=useSearchParams()
    const router=useRouter();
    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    useEffect(() => {
            getData();
           if (!session) {
             router.push('/login');
           } 
         }, [session,router]);

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
           toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
        router.push(`/${username}`);
            
        

    }, [])
    const getData = async () => {
        let u = await fetchuser(username);
        setcurrentuser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments);
    }
    const pay = async (amount) => {
        //Get the order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id;
        var option = {
            "key": currentuser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "Get Me a chai",
            "deScription": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `/api/razorpay`,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000",
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            }
        }
        var rzp1 = new Razorpay(option);
        rzp1.open();

    }

    
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <Script>
                {`var options = {
                    "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
                "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Acme Corp", //your business name
                "deScription": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": "order_9A33XWu170gUtm", 
                "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates },
                "notes": {
                    "address": "Razorpay Corporate Office"},
                "theme": {
                    "color": "#3399cc"
                        }
                 };
                var rzp1 = new Razorpay(options);
                document.getElementById('rzp-button1').onclick = function(e){
                    rzp1.open();
                e.preventDefault();
}`}
            </Script>
            <div className="cover w-full bg-red-50 relative">
                <img className='object-cover w-full h-[350]' src={currentuser.coverpic} alt="" />
                <div className='absolute -bottom-36 flex flex-col items-center justify-center right-[25%] sm:right-[40%] md:right-[44%] '>
                    <img  width={100} height={100} className=' border-2 border-white rounded-lg' src={currentuser.profilepic} alt="" />
                
           
           
                <div className=' flex gap-1 flex-col justify-center items-center'>
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} get a chai!
                </div>
                <div className='text-slate-400 mb-2'>
                    {Payments.length} Payments.  ₹{Payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>
                </div>
                 </div>
                 </div>
                 <div className="info flex gap-1 flex-col justify-center items-center mt-44 ">
                <div className="payment w-[90%]  flex flex-col items-center md:items-start md:flex-row gap-3">
                    <div className="supporters min-h-[200px] md:min-h-[400px] w-full md:w-1/2 bg-slate-800 rounded-lg text-white p-5 mb-10">
                        {/* Show List of all the supporters s a leaderboard  */}
                        <h2 className='text-lg font-bold'>Top 10 Supporters</h2>
                        <ul className='mx-4'>
                            {Payments.length == 0 && <><h3 className='text-lg font-semibold'>No Payment Recived</h3>
                            </>}
                            {Payments.map((p, i) => {
                                return <><li className='my-2 flex gap-2 items-center'>
                                    <img className='w-10 h-10' src="/avatar.gif" alt="" />
                                    <span>
                                        {p.name} denoted <span className='font-bold'>${p.amount}</span> with a message "{p.message}"
                                    </span>
                                </li>
                                </>
                            })}



                        </ul>
                    </div>
                    <div className="makePayment w-full md:w-1/2 bg-slate-800 rounded-lg text-white p-5 mb-10">
                        <h2 className='text-lg font-bold'>Make a Payment</h2>
                        <div className="flex gap-2 flex-col my-2 items-center justify-center">
                            <input name='name' value={paymentform.name} onChange={handlechange} type="text" className='w-full p-3 rounded-lg bg-slate-600' placeholder='Enter Name' />
                            <input name='message' value={paymentform.message} onChange={handlechange} type="text" className='w-full p-3 rounded-lg bg-slate-600' placeholder='Enter Message' />
                            <input name='amount' value={paymentform.amount} onChange={handlechange} type="text" className='w-full p-3 rounded-lg bg-slate-600' placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className="text-white bg-gradient-to-br w-full from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 text-lg disabled:bg-slate-600 disabled:from-green-200" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                        </div>
                        Or choose from these amounts
                        <div className="flex gap-2 mt-5">
                            <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
