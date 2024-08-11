import { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/minimal.css'
import styles from './paginaiton.module.css'
import { useSearchParams } from 'next/navigation'

export default function Pagination({
  totalPages,
  onChange,
}: Readonly<{ totalPages: number; onChange: (currentPage: number) => void }>) {
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onChange(page)
  }

  useEffect(() => {
    const page = searchParams.get('page')
    if (!page) {
      return
    }
    setCurrentPage(Number(page))
  }, [searchParams])

  return (
    <ResponsivePagination
      extraClassName={styles.pagination}
      current={currentPage}
      maxWidth={200}
      total={totalPages}
      onPageChange={handlePageChange}
    />
  )
}
