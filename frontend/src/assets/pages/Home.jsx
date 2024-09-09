import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Docs from '../components/Docs';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {

  const navigate = useNavigate();

  const [ShowModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [search, setsearch] = useState('')
  const [isLoggedIn, setisLoggedIn] = useState(null)

  
  const [docsdata, setdocsdata] = useState([])

  const createDoc = async () => {

    if (title === '') {
      setError('Please Enter title !')
    }
    else {
      let a = await fetch('https://docs-flow.onrender.com' + '/createDoc', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          userId: localStorage.getItem('userId')
        }),
      })
      let data = await a.json()

      if (data.success == true) {
        setdocsdata((prevDocs) => [...prevDocs, data.newDoc])
        
        setTimeout(() => {
          setShowModal(false)
          navigate(`/createDocs/${data.docsId}`)
        }, 50);

      }
      else {
        setError(data.message)
      }
    }
  }

  const getAllDocs = async () => {

    let a = await fetch('https://docs-flow.onrender.com' + '/fetchAllDocs', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      }),
    })
    let data = await a.json()

    if (data.success == true) {
      setdocsdata(Array.isArray(data.alldocs) ? data.alldocs : []);
    }
    else {
      setError(data.message)
    }
  }

  
  const setuser = () => {
    if (localStorage.getItem('isLoggedIn') == 'true'){
      setisLoggedIn(true)
    }
    else{
      setisLoggedIn(false)
    }
  }

  useEffect(() => {
    getAllDocs()
    setuser()
  }, [docsdata,isLoggedIn])




  return (
    <>
    
      <Navbar search={search} setsearch={setsearch} docsdata={docsdata}/>
      <div><Toaster/></div>
      {isLoggedIn == true && <section className=' md:px-14 px-3.5 py-2.5'>
        <div className="flex items-center justify-between md:my-6 my-5">
          <h3 className=' md:text-[26px] text-[20px] font-Averia font-bold'>All Documents</h3>
          <div className='bg-[#0086f9] flex items-center text-white md:px-1.5 md:py-1.5 px-0.5 py-0.5 md:rounded-lg  rounded-[4.5px] cursor-pointer' onClick={() => {
            setShowModal(true);
            document.getElementById('title')
            // .focus();
          }}> <span ><img src='./add.svg' alt='' className=' md:w-6 md:h-6 w-5 h-5' /></span> <span className=' md:text-[16px] text-[12.75px] mx-1 font-abee'>New Document</span></div>
        </div>

        
          {
            docsdata.length !== 0 ? docsdata.filter(item => {
              return search.toLowerCase() === '' ? item : item.title.includes(search)
          }).map((element, index) => {
              if (!element || !element._id) return null;
              return (
                <>
                  {/* docID={`doc-${index + 1}`} */}

                  <div key={element._id}>
                    <Docs docs={element} />
                  </div>
                </>
              )
            }) : ""
          }
      </section> } 

      { isLoggedIn == false && <div className=' flex justify-center items-center text-[18px] my-6 font-abee'><Link to='/login'><span className=' mx-2 font-semibold text-blue-800'>Login</span></Link> to create documents</div> }


      {
        ShowModal ?
          <>
            <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
              <div className="createDocsModel py-3 px-3 bg-[#fff] rounded-lg xl:w-[36vw] lg:w-[45vw] w-[80vw] ">
                <h3 className='text-[20px] font-Averia font-semibold'>Create New Document</h3>

                <div className=' mt-3 py-2'>
                  <p className=' text-[14px] text-[#808080]'>Title</p>
                  <div className=' flex items-center justify-between border rounded-xl my-2 bg-[#D1D5DB]'>
                    <img src='./title.svg' alt='' className=' mx-1 w-6 h-6' />
                    <input onChange={(e) => { setTitle(e.target.value) }} className=' w-full outline-none py-2 bg-[#D1D5DB] px-1.5' value={title} type="text" placeholder='Enter Title' id='title' name='title' required />
                  </div>
                </div>

                <div className="flex  items-center justify-between md:gap-4 gap-[3vw] w-full">
                  <button onClick={createDoc} className='bg-[#0086f9] text-white w-1/2 flex items-center md:gap-1 gap-0.5 md:py-2 py-1.5  rounded-lg'><span  ><img src='./add.svg' alt='' className=' md:mx-1.5 md:w-6 md:h-6 mx-0.5 w-5 h-5' /></span> <span className='md:text-[16px] text-[12.5px]  font-abee'>Create Document</span></button>
                  <button onClick={() => { setShowModal(false) }} className=' md:py-2 py-1.5 bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer w-1/2 '><span className=' md:text-[16px] text-[12.5px] font-abee'>Cancel</span></button>
                </div>
              </div>
            </div>
          </> : ""
      }


    </>
  )
}

export default Home