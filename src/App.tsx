import { useEffect, useState } from 'react'
import get_data from './read_excel';
import CourseElement from './CourseElement';
function App() {
  const [photoshop_courses, setPhotoshopCourses] = useState<Record<any,any>[]>([]);
  const [animation_courses, setAnimationCourses] = useState<Record<any,any>[]>([]);
  const [photoshop_course_elements,setPhotoshopCourseElements]=useState<React.JSX.Element[]>();
  const [animation_course_elements,setAnimationCourseElements]=useState<React.JSX.Element[]>();

  const [sort_by,setSortBy]=useState("ID");
  const [sort_ascending,setSortAscending]=useState(true);

  //ID	Course	Provider	Link	Description	Hours	Cost	Level
  const sort_columns=["ID","Course","Provider","Hours","Cost","Level"];
  const is_num_column_arr=[true,false,false,true,true,false];
  const sort_columns_options=sort_columns.map(sort_column=><option value={sort_column}>{sort_column}</option>);

  let up_arrow=<>↑</>;
  let down_arrow=<>↓</>;
  if(sort_ascending)
  {
    up_arrow=<b style={{color:"blue"}}>↑</b>
  }
  else
  {
    down_arrow=<b style={{color:"blue"}}>↓</b>
  }

  function update_sort_by(e: React.ChangeEvent<HTMLSelectElement>)
  {
    setSortBy(e.target.value);
  }
  function update_sort_ascending(new_value:boolean)
  {
    console.log("Make sort "+new_value);
    setSortAscending(new_value);
  }
  function sort_data(arr:Record<any,any>[])
  {
    console.log(arr);
    console.log(sort_by);
    const sort_column_index=sort_columns.indexOf(sort_by);
    const is_num_column=is_num_column_arr[sort_column_index];
    if(is_num_column)
    {
      if(sort_ascending)
      {
        arr.sort((a,b)=>a[sort_by]-b[sort_by]);
      }
      else
      {
        arr.sort((a,b)=>b[sort_by]-a[sort_by]);
      }
    }
    else
    {
      if(sort_ascending)
      {
        arr.sort((a,b)=>a[sort_by].localeCompare(b[sort_by]));
      }
      else
      {
        arr.sort((a,b)=>b[sort_by].localeCompare(a[sort_by]));
      }
    }
    return arr;
  }

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
    let photoshop_courses_temp=[...photoshop_courses];
    photoshop_courses_temp=sort_data(photoshop_courses_temp);
    setPhotoshopCourses(photoshop_courses_temp);

    let animation_courses_temp=[...animation_courses];
    animation_courses_temp=sort_data(animation_courses_temp);
    setAnimationCourses(animation_courses_temp);
  },[sort_ascending,sort_by]);

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
    <h1>Art Courses</h1>
    <h2>Settings</h2>
    <div className="container d-inline-block bg-light border" id="settings_grid">
    <div className="row">
    <div className="col border">
    Sort By
    </div>
    <div className="col border">
    Direction
    </div>
    </div>
    <div className="row">
    <div className="col border">
    <select id="sort_by" value={sort_by} onChange={update_sort_by}>
    {sort_columns_options}
    </select>
    </div>
    <div className="col border">
    <button id="asc_button" onClick={()=>update_sort_ascending(true)}>{up_arrow}</button>
    <button id="desc_button" onClick={()=>update_sort_ascending(false)}>{down_arrow}</button>
    </div>
    </div>
    </div>

    <h2>Animation Courses</h2>
    <div className="container">
    {animation_course_elements}
    </div>
    <h2>Photoshop Courses</h2>
    <div className="container">
    {photoshop_course_elements}
    </div>
    </>
  )
}

export default App
