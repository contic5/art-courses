import { useEffect, useState } from 'react'
import get_data from './read_excel';
import CourseElement from './CourseElement';
function App() {
  const [photoshop_courses, setPhotoshopCourses] = useState<Record<any,any>[]>([]);
  const [animation_courses, setAnimationCourses] = useState<Record<any,any>[]>([]);
  const [photoshop_course_elements,setPhotoshopCourseElements]=useState<React.JSX.Element[]>();
  const [animation_course_elements,setAnimationCourseElements]=useState<React.JSX.Element[]>();

  useEffect(()=>
  {
    async function async_wrapper()
    {
      if(photoshop_courses.length==0)
      {
        const photoshop_courses_temp=await get_data("Art_Courses.xlsx","Photoshop");
        console.log(photoshop_courses_temp);
        setPhotoshopCourses(photoshop_courses_temp);

        const animation_courses_temp=await get_data("Art_Courses.xlsx","Animation");
        console.log(animation_courses_temp);
        setAnimationCourses(animation_courses_temp);
      }
    }
    async_wrapper();
  },[]);

  useEffect(()=>
  {
    if(photoshop_courses.length>0&&animation_courses.length>0)
    {
      const photoshop_course_elements_temp=photoshop_courses.map(course=><CourseElement key={`course_${course}`} course={course}></CourseElement>)
      setPhotoshopCourseElements(photoshop_course_elements_temp);

      const animation_course_elements_temp=animation_courses.map(course=><CourseElement key={`course_${course}`} course={course}></CourseElement>)
      setAnimationCourseElements(animation_course_elements_temp);
    }
  },[photoshop_courses,animation_courses])
  return (
    <>
    <h1>Animation Courses</h1>
    <div className="container">
    {animation_course_elements}
    </div>
    <h1>Photoshop Courses</h1>
    <div className="container">
    {photoshop_course_elements}
    </div>
    </>
  )
}

export default App
