import { useRef, useState } from "react"
import { FormDataInterface } from "./subcomponts/interfaces";
import DetectClickOutsideComponent from "./subcomponts/clickedOutSideRef";


function LogForm (props) {
  const {setLogFoodEntryIsOpen} = props;

  const [logEntry, setLogEntry] = useState<FormDataInterface>({})






  const logWrapperRef = useRef<HTMLDivElement>()
  //passsing through the ref to tell program where to loog and sending the state to tell it where to close
  DetectClickOutsideComponent(logWrapperRef, setLogFoodEntryIsOpen)

  function handleFormSubmit (e) {
    e.preventDefault()
    console.log(typeof e)



    // add type before submiting the data 
      //i dont have a data base to submit it to yet
  }

  function handleFormChange (e) {
    e.preventDefault();
    const fieldName : string =  e.target.getAttribute('name');
    const fieldValue : string = e.target.value
    
    const newFormData : object = {...logEntry}
    newFormData[fieldName] = fieldValue

    setLogEntry(newFormData)
  }

  return (

    <form ref={logWrapperRef} onSubmit={(e)=>{handleFormSubmit(e)}} className="absolute flex flex-wrap justify-center w-5/6 p-2 text-black -translate-x-1/2 -translate-y-1/2 shadow-md shadow-black/45 top-1/2 left-1/2 log-form">
      <input type="text" value={logEntry.name} name="name" placeholder="Item Name" className="w-5/6 log-form-input" onChange={handleFormChange} />
      <div className="flex flex-wrap justify-around mt-3">
        <div className="flex flex-wrap justify-center" id="calories-fill">
          <div className="w-full p-3">
            <svg viewBox="0 0 16 16" width="24" height="24" className="m-auto">
              <path d="M9.533.753V.752c.217 2.385 1.463 3.626 2.653 4.81C13.37 6.74 14.498 7.863 14.498 10c0 3.5-3 6-6.5 6S1.5 13.512 1.5 10c0-1.298.536-2.56 1.425-3.286.376-.308.862 0 1.035.454C4.46 8.487 5.581 8.419 6 8c.282-.282.341-.811-.003-1.5C4.34 3.187 7.035.75 8.77.146c.39-.137.726.194.763.607ZM7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.79 2.79 0 0 1-1.436-.874A3.198 3.198 0 0 0 3 10c0 2.53 2.164 4.5 4.998 4.5Z"></path>
            </svg>
          </div>
          <input type="text" value={logEntry.calories} name="calories" placeholder="calories" className="log-form-input log-form-input-small" onChange={handleFormChange} />
        </div>
        <div className="flex flex-wrap justify-center" id="fat-fill">
          <div className="w-full p-3">
          <svg width="24" height="24"  className="m-auto" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" >
            <path d="m19.023 7c-.389 0-3.3 1-7.023 1-3.75 0-6.605-1-7.024-1-.538 0-.976.438-.976.976 0 .453.321.854.757.951 2.162.563 4.571.948 4.571 3.132 0 3.565-2.321 6.899-3.26 8.476-.086.149-.131.319-.131.489 0 .539.438.976.977.976.261 0 .508-.103.694-.29.769-.772 2.292-3.072 2.989-4.182.391-.622.791-1.18 1.409-1.181.603.001 1.005.559 1.397 1.181.697 1.11 2.219 3.41 2.988 4.182.185.187.432.29.695.29.538 0 .976-.437.976-.976 0-.17-.045-.339-.141-.505-.962-1.617-3.25-4.891-3.25-8.46 0-2.309 2.751-2.661 4.563-3.13.443-.099.766-.5.766-.953 0-.538-.439-.976-.977-.976zm-7-5c1.374 0 2.488 1.12 2.488 2.5s-1.114 2.5-2.488 2.5c-1.373 0-2.489-1.12-2.489-2.5s1.116-2.5 2.489-2.5z" fill-rule="nonzero"/>
          </svg>
          </div>
          <input type="text" value={logEntry.fat} name="fat" placeholder="fat" className="log-form-input log-form-input-small" onChange={handleFormChange} />
        </div>
        <div className="flex flex-wrap justify-center" id="carbs-fill">
          <div className="w-full p-3">
            <svg width="24" height="24" className="m-auto" viewBox="0 0 24 24">
              <g stroke-width="1"  fill-rule="evenodd">
                <path d="M3.46530832,20.534679 L15.2109027,8.78899174 M8.90748885,9.23119339 C10.5260377,10.4451155 10.8540525,12.741287 9.64013033,14.3598359 C9.48392783,14.5681041 9.3061194,14.7589289 9.10982697,14.9291885 L8.90748885,15.0924774 C7.28893997,13.8785552 6.96092521,11.5823837 8.17484736,9.96383487 C8.33104986,9.75556668 8.5088583,9.56474181 8.70515072,9.39448224 L8.90748885,9.23119339 Z M11.8381055,6.30055141 C13.4566544,7.51447356 13.7846691,9.81064501 12.570747,11.4291939 C12.4145445,11.6374621 12.236736,11.8282869 12.0404436,11.9985465 L11.8381055,12.1618354 C10.2195566,10.9479132 9.89154184,8.65174177 11.105464,7.03319289 C11.2616665,6.82492469 11.4394749,6.63409983 11.6357674,6.46384026 L11.8381055,6.30055141 Z M14.7687221,3.36990942 C16.387271,4.58383158 16.7152858,6.88000303 15.5013636,8.4985519 C15.3451611,8.7068201 15.1673527,8.89764496 14.9710602,9.06790454 L14.7687221,9.23119339 C13.1501732,8.01727123 12.8221585,5.72109978 14.0360806,4.10255091 C14.1922831,3.89428271 14.3700916,3.70345785 14.566384,3.53319827 L14.7687221,3.36990942 Z M20.6299554,9.23119339 C19.4160647,10.8497283 17.1199302,11.1777572 15.5013953,9.96386656 C15.2931167,9.80765894 15.102283,9.62984306 14.9320168,9.43354137 L14.7687221,9.23119339 C15.9826128,7.61265851 18.2787473,7.28462956 19.8972822,8.49852022 C20.1055608,8.65472784 20.2963945,8.83254372 20.4666607,9.02884541 L20.6299554,9.23119339 Z M17.6993388,12.1618354 C16.4854481,13.7803702 14.1893135,14.1083992 12.5707787,12.8945085 C12.3625,12.7383009 12.1716664,12.560485 12.0014002,12.3641834 L11.8381055,12.1618354 C13.0519961,10.5433005 15.3481307,10.2152715 16.9666656,11.4291622 C17.1749442,11.5853698 17.3657778,11.7631857 17.536044,11.9594874 L17.6993388,12.1618354 Z M14.7687221,15.0924774 C13.5548315,16.7110122 11.2586969,17.0390412 9.64016202,15.8251505 C9.43188339,15.6689429 9.24104976,15.491127 9.07078357,15.2948253 L8.90748885,15.0924774 C10.1213795,13.4739425 12.4175141,13.1459135 14.036049,14.3598042 C14.2443276,14.5160118 14.4351612,14.6938277 14.6054274,14.8901294 L14.7687221,15.0924774 Z M5.90748885,12.2311934 C7.52603772,13.4451155 7.85405249,15.741287 6.64013033,17.3598359 C6.48392783,17.5681041 6.3061194,17.7589289 6.10982697,17.9291885 L5.90748885,18.0924774 C4.28893997,16.8785552 3.96092521,14.5823837 5.17484736,12.9638349 C5.33104986,12.7555667 5.5088583,12.5647418 5.70515072,12.3944822 L5.90748885,12.2311934 Z M11.7687221,18.0924774 C10.5548315,19.7110122 8.25869689,20.0390412 6.64016202,18.8251505 C6.43188339,18.6689429 6.24104976,18.491127 6.07078357,18.2948253 L5.90748885,18.0924774 C7.12137951,16.4739425 9.41751408,16.1459135 11.036049,17.3598042 C11.2443276,17.5160118 11.4351612,17.6938277 11.6054274,17.8901294 L11.7687221,18.0924774 Z M20.7375506,3.26301485 C21.0236732,5.26589042 19.6319978,7.12145287 17.6291624,7.40756974 C17.3714382,7.44438685 17.1107705,7.45359128 16.8515745,7.4351821 L16.593027,7.40752834 C16.3069102,5.40469292 17.6985855,3.54913047 19.7014209,3.26301359 C20.0450532,3.2139237 20.3939185,3.21392412 20.7375506,3.26301485 Z"></path>
              </g>
            </svg>
          </div>
          <input type="text" value={logEntry.carbs} name="carbs" placeholder="carbs" className="log-form-input log-form-input-small" onChange={handleFormChange} />
        </div>
        <div className="flex flex-wrap justify-center" id="serving-size-fill">
          <div className="w-full p-3">
            <svg height="24" width="24" viewBox="0 0 500.14 500.14" className="m-auto" >
              <g stroke-width="0"></g>
              <g stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="measuring-cup">
                  <path d="M449.121,44.382H27.959c-10.139,0-19.496,5.502-24.403,14.323c-4.939,8.84-4.72,19.661,0.576,28.286 l59.324,96.48v177.972c0,52.003,42.316,94.318,94.328,94.318H306.71c52.007,0,94.323-42.315,94.323-94.318V248.673 c7.034,19.773,25.935,33.965,48.088,33.965c28.13,0,51.023-22.88,51.023-51.023V95.405 C500.144,67.267,477.251,44.382,449.121,44.382z M466.81,231.614c0,9.75-7.935,17.693-17.689,17.693 c-9.75,0-17.685-7.943-17.685-17.693V129.878c0-9.21-7.463-16.664-16.665-16.664h-30.403c-9.206,0-16.665,7.454-16.665,16.664 v231.565c0,33.627-27.361,60.983-60.993,60.983H157.783c-33.636,0-60.993-27.356-60.993-60.983v-182.69 c0-3.074-0.855-6.102-2.465-8.722L37.553,77.716h411.567c9.754,0,17.689,7.943,17.689,17.689V231.614z"></path> 
                  <path d="M142.303,162.577h49.999c6.901,0,12.499-5.602,12.499-12.499c0-6.901-5.598-12.503-12.499-12.503 h-49.999c-6.901,0-12.498,5.602-12.498,12.503C129.804,156.975,135.402,162.577,142.303,162.577z"></path> 
                  <path d="M142.303,295.905h49.999c6.901,0,12.499-5.598,12.499-12.5c0-6.9-5.598-12.502-12.499-12.502 h-49.999c-6.901,0-12.498,5.602-12.498,12.502C129.804,290.308,135.402,295.905,142.303,295.905z"></path> 
                  <path d="M208.967,337.571h-66.664c-6.901,0-12.498,5.598-12.498,12.498c0,6.901,5.598,12.499,12.498,12.499 h66.664c6.901,0,12.498-5.598,12.498-12.499C221.465,343.169,215.868,337.571,208.967,337.571z"></path>
                  <path d="M208.967,204.239h-66.664c-6.901,0-12.498,5.602-12.498,12.503c0,6.901,5.598,12.499,12.498,12.499 h66.664c6.901,0,12.498-5.598,12.498-12.499C221.465,209.841,215.868,204.239,208.967,204.239z"></path>
                </g> 
              </g>
            </svg>
          </div>
          <input type="text" value={logEntry.serving_size} name="serving_size" placeholder="serving size" className="log-form-input log-form-input-small" onChange={handleFormChange} />
        </div>
        <div className="flex flex-wrap justify-center" id="serving-type-fill">
          <div className="w-full p-3">
            <svg width="24" height="24" viewBox="0 0 24 24" className="m-auto">
              <path d="M8 5h-1v-2h1v2zm2-2h-1v2h1v-2zm5 0h-1v2h1v-2zm2 0h-1v2h1v-2zm-11 0h-1v3h1v-3zm13 0h-1v3h1v-3zm-6 0h-2v3h2v-3zm-1 13c-.553 0-1 .448-1 1s.447 1 1 1 1-.448 1-1-.447-1-1-1zm12-11v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-9 13c0-1.657-1.344-3-3-3s-3 1.343-3 3 1.344 3 3 3 3-1.343 3-3zm7-13c0-1.654-1.346-3-3-3h-14c-1.654 0-3 1.346-3 3v7h7l3-4 3 4h7v-7z"/>
            </svg>
          </div>
          <input type="text" value={logEntry.serving_type} name="serving_type" placeholder="serving type" className="log-form-input log-form-input-small" onChange={handleFormChange} />
        </div>
        <div className="flex flex-wrap justify-center" id="servings-fill">
          <div className="w-full p-3">
          <svg width="24" height="24" className="m-auto" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M12-.006c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm5.999 19.999c2.429-1.825 4.001-4.73 4.001-7.999 0-5.519-4.481-10-10-10s-10 4.481-10 10c0 3.701 2.015 6.936 5.008 8.665v-4.023c0-.576-.36-.765-1.147-1.395-.581-.466-.981-1.194-.907-1.935.209-2.114.718-6.312.718-6.312h.5v5h.836l.186-5h.506l.144 5h.836l.201-5h.469l.166 5h.835v-5h.458s.562 4.171.793 6.292c.081.751-.341 1.493-.935 1.963-.791.626-1.151.806-1.151 1.391v5.042c.794.204 1.626.312 2.484.312 1.229 0 2.407-.222 3.496-.629v-3.371s-.977-.003-2.056 0c.668-5.83 2.586-11 3.883-11 .373 0 .67.297.673.709.005.802.004 7.091.003 12.29z"/>
          </svg>
          </div>
          <input type="text" value={logEntry.servings} name="servings" placeholder="servings" className="log-form-input log-form-input-small" onChange={handleFormChange} />
        </div>        
        
        
        
        
        
        
      </div>
      <br />
      <div className="flex flex-wrap justify-center w-full mt-2">
        <button className="log-form-submit" type="submit">
          <span className="log-form-submit-icon-container">
            <svg viewBox="0 0 384 512" height="0.9em" className="log-form-submit-icon">
              <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
            </svg>
          </span>
          <p className="log-form-text">Save</p>
        </button>
      </div>
    </form>


  )
}

export default LogForm