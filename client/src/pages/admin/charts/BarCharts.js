import React, {useEffect} from 'react'
import AdminSidebar from '../../../components/admin/AdminSidebar'
import { BarChart } from "../../../components/admin/Charts";
import { useSelector , useDispatch } from 'react-redux';
import { fetchBarData } from '../../../redux/charts';




const BarCharts = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBarData());
  }, [dispatch]);

  const data = useSelector((state) => state.chart.barData);
  console.log(data)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_2={data?.products}
            data_1={data?.users}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
            labels={["January", "February", "March", "April", "May", "June", "July"]}
          /> 
          <h2>Top Products & Top Customers</h2>
        </section>
        <section>
          {data?.orders && data?.orders?.length > 0 ? (
            <BarChart
            horizontal={true}
            data_1={data?.orders}
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={months}
          />
          ) : <p>No data</p>} 
          
          <h2>Orders throughout the year</h2>
        </section>
      </main>
    </div>
  )
}

export default BarCharts
