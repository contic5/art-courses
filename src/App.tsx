import { useEffect, useState } from 'react'
import get_data from './read_excel';
import CourseElement from './CourseElement';
function App() {
  const [excel_data, setExcelData] = useState<Record<any,any>[]>([]);
  const [course_elements,setCourseElements]=useState<React.JSX.Element[]>();

  useEffect(()=>
  {
    async function async_wrapper()
    {
      if(excel_data.length==0)
      {
        const excel_data_temp=await get_data("Photoshop_Courses.xlsx","Data");
        console.log(excel_data_temp);
        setExcelData(excel_data_temp);
      }
    }
    async_wrapper();
  },[]);

  useEffect(()=>
  {
    if(excel_data.length>0)
    {
      const course_elements_temp=excel_data.map(course=><CourseElement key={`course_${course}`} course={course}></CourseElement>)
      setCourseElements(course_elements_temp);

    }
  },[excel_data])
  return (
    <>
    <h1>Photoshop Courses</h1>
    <div className="container">
    {course_elements}
    </div>
    </>
  )
}

export default App
