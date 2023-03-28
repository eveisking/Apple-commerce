import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import { Tab } from '@headlessui/react'
import { GetServerSideProps } from 'next'
import { fecthCategories } from '../../utils/fetchCategories'
import Tabs from '@/components/Tabs'
import { fecthProducts } from '../../utils/fetchProducts'
import Products from '@/components/Products'

const inter = Inter({ subsets: ['latin'] })


interface Props {
  categories: Category[];
  products: Product[];
}

//Backend code 
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await fecthCategories();
  const products = await fecthProducts();
  return {
    props: {
      categories,
      products,
    },
  }
}

export default function Home({categories, products}:Props) {
console.log(products);

const showProduct = (category: number) => {
  return products.filter((product) => product.category._ref === categories[category]._id)
  .map((product) => <Products product={product} key={product._id}/>)
}
  return (
    <>
      <Head>
        <title>Apple Redesign</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className='relative h-[200vh] bg-[#E7ECEE]'>
        <Banner />
    
      </main>
      <section className='relative z-40 mt-[-100vh] min-h-screen bg-[#1B1B1B]'>
        <div className='flex items-center flex-col justify-center max-w-[80%] mx-auto py-10 space-y-10'>
        <h2 className='text-center text-4xl font-medium tracking-wide md:text-5xl
        text-white'>
          New Promos
        </h2>
        <Tab.Group>
          <Tab.List className="flex justify-center">
            {categories.map((category) => (
              <Tab 
               key={category._id}
               id={category._id}
               className={({selected}) => 
               `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light
               outline-none md:py-4 md:px-6 md:text-base ${
                selected ?
                "borderGradient bg-[#35383C] text-white"
                : "border-b-2 border-[#35383C] text-[#35383C]"
               }`
               }
               >
                {category.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mx-auto max-w-fit  pt-10 pb-24 sm:px-4'>
            <Tab.Panel className='tabPanel'>{showProduct(0)}</Tab.Panel>
            <Tab.Panel className='tabPanel'>{showProduct(1)}</Tab.Panel>
            <Tab.Panel className='tabPanel'>{showProduct(2)}</Tab.Panel>
            <Tab.Panel className='tabPanel'>{showProduct(3)}</Tab.Panel> 
            
          </Tab.Panels>
        </Tab.Group>
        </div>
      </section>
    </>
  )
}
