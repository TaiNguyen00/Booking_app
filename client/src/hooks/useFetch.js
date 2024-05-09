import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = ( url ) => { // nhận url để query params, render lại giao diện khi có sự thay đổi
  const [ data, setData ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
          const res = await axios.get(url)
          setData(res.data)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    fetchData()
  },[url])   // mẫu chốt của việc này là nó dùng loại thứ 3, render lại giao diễn mỗi khi thay đổi URL, hoặc có thể bỏ loại này đi lấy 
  // loại 2, dùng reFetch khi nhấn nút nó sẽ cập nhật lại :D

  const reFetch = async () => {
    setLoading(true)
    try {
      const res = await axios.get(url)
      setData(res.data)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }


  return {data, loading, error, reFetch}
}

export default useFetch

