import CustomerTable from '@/components/table/customer/customer-table'
import React from 'react'

type Customer = {
  id: string
  name: string
  email: string
  totalOrders: number
  totalSpent: number
  lastPurchaseDate: string
  customerSince: string
  loyaltyTier: string
}

const data: Customer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    totalOrders: 15,
    totalSpent: 1250.75,
    lastPurchaseDate: '2023-09-01',
    customerSince: '2022-03-15',
    loyaltyTier: 'Gold',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    totalOrders: 8,
    totalSpent: 675.50,
    lastPurchaseDate: '2023-08-28',
    customerSince: '2022-06-22',
    loyaltyTier: 'Silver',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    totalOrders: 22,
    totalSpent: 1890.25,
    lastPurchaseDate: '2023-09-05',
    customerSince: '2021-11-30',
    loyaltyTier: 'Platinum',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    totalOrders: 5,
    totalSpent: 320.00,
    lastPurchaseDate: '2023-07-15',
    customerSince: '2023-01-10',
    loyaltyTier: 'Bronze',
  },
  {
    id: '5',
    name: 'Eva Martinez',
    email: 'eva@example.com',
    totalOrders: 18,
    totalSpent: 1575.60,
    lastPurchaseDate: '2023-09-03',
    customerSince: '2022-02-14',
    loyaltyTier: 'Gold',
  },
]

const CustomersPage = () => {
  
  return (
    <CustomerTable data={data} />
  )
}

export default CustomersPage