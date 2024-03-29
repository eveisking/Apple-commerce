import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//import currency from 'react-currency-formater'
import { selectCartItems, selectCartTotal } from '@/redux/cartSlice'


import Button from '@/components/Button'
import CheckoutProducts from '@/components/CheckoutProducts'
import OrderSummary from '@/components/OrderSummary'



const checkout = () => {
    const router = useRouter();
    const items = useSelector(selectCartItems);
    const [groupItemsInCart, setGroupItemsInCart ] = useState(
        {} as {[key: string]: Product[]}
    );

    useEffect(() => {
     const groupItems = items.reduce((results, item) => { 
        (results[item._id] = results[item._id] || []).push(item);
        
        return results;
     }, {} as {[key: string]: Product[]}
     );
     setGroupItemsInCart(groupItems); 
    },[items]);

    
  return (
    <section className='w-full bg-[#ececec] h-full min-h-screen pb-8'>
        <Header />
        <div className='h-[14vh] bg-white px-10 flex items-center justify-start
        shadow-sm'> 
            
            <h1 className='text-4xl '>
            {items.length > 0? "Review Your Cart" : "Your Cart is Empty"}
            </h1>
        </div>
        {items.length === 0 && (
            <div className='flex w-full px-8 items-center justify-center my-8'>
            <Button title='Continue Shopping'
            onClick={() => router.push("/")} width='lg:w-[30%] w-[50%]'/>
            </div>
        )}
        {items.length > 0 && (
         <div className='w-[83.5%] max-[89vw] mx-auto flex items-center justify-center mt-4 bg-white
         py-4 rounded-md'>
             <p className='text-[13px] font-medium'>Free delivery for purchase more than $50</p>
         </div>
        )}
        

        {items.length > 0 && (
            <div>
                <div className='w-[100%] max-w-[1204px] mx-auto py-4 flex items-center'>
        <div className='flex flex-col sm:flex-row items-start justify-center sm:justify-between space-x-0 sm:space-x-6 space-y-4 sm:space-y-0 w-[100%] m-10'>
         <div className='flex-2 w-full bg-white rounded-md
            h-max px-4 space-y-4 py-6 shadow-sm'>

             <table className="table-auto w-full h-full space-y-4">
             <thead className='text-left uppercase py-4 font-semibold text-1xl divide-y-2 border-b border-black border-spacing-4 mb-6'>
    <tr className='mb-4'>
      <th>Apple</th>
      <th>Price</th>
      <th>Quantity</th>
      <th></th>
    </tr>
  </thead>
  {Object.entries(groupItemsInCart).map(([key, items]) => (
                    <CheckoutProducts key={key} items={items} id={key}/>
                ))}
</table>
     </div>
        
        <OrderSummary items={items}/>
        </div>
        </div>
               
            </div>
        )}
        
    </section>
  )
}

export default checkout