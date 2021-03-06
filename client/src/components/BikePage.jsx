import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";

import rossi from '/client/public/rossi.jpg'
import bikeImg from '/client/public/bike.png'

function BikePage(props) {

    let history = useHistory()
    const { id } = useParams()

    const db = getFirestore(props.app);
    const [bike, setBike] = useState()

    const [average_list, setAverage_list] = useState([])
    const [km_list, setKm_list] = useState([])

    const [confirm, setConfirm] = useState(false)

    const [user] = useAuthState(props.auth)

    useEffect(() => {
      if (user) {
        async function getBike() {
            const ref = doc(db, user.auth.currentUser.uid, id)
            await getDoc(ref).then((doc) => {
              setBike(doc.data())
            })
        }

        getBike()
      }
    }, [user])

    useEffect(() => {

      if (bike) {
        setKm_list(bike.records.map(({totalKm}) => totalKm))
        let prev = bike.startKm
        setAverage_list(bike.records.map((record) => {
          const avg = (record.totalKm - prev) / record.liters
          prev = record.totalKm
          return avg
        }))
      }
      
    }, [bike])

    function timeConverter(timestamp){
      var a = new Date(timestamp.substring(0, timestamp.length - 3) * 1000)
      var dd = a.getDate()
      var mm = a.getMonth() + 1; //January is 0!
      var yyyy = a.getFullYear();
      var time = [dd, mm, yyyy].join('/')
      return time;
    }

    const data = {
      labels: km_list,
      datasets: [
        {
          label: 'Average Km/l',
          data: average_list,
          fill: false,
          backgroundColor: 'rgb(50,205,50)',
          borderColor: 'rgba(50,205,50, 0.2)',
          tension: 0.1
        },
      ],
    };
    
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      interaction: {
        intersect: false
      },
      plugins: {
        tooltip: {
          yAlign: 'bottom',
          displayColors: false,
          titleAlign: 'center',
          callbacks: {
            title: (item) => {
              return timeConverter(bike.records.find(x => x.totalKm == item[0].label).date)
            }
          }
        }
      }
    };

    return (
        <div>
            {bike && 
                <div>
                <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
                <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
                <main className="profile-page">
                  <section className="relative block h-500-px">
                    <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{backgroundImage: `url(${rossi})`}}>
                      <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black" />
                    </div>
                    <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
                      <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x={0} y={0}>
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100" />
                      </svg>
                    </div>
                  </section>
                  <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                          <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                              <div className="relative">
                                <img alt="..." src={bikeImg} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                              <div className="py-6 px-3 mt-32 sm:mt-0">
                                <button hidden={confirm} onClick={() => setConfirm(!confirm)} className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                  Delete
                                </button>
                                <button hidden={!confirm} onClick={() => deleteDoc(doc(db, user.auth.currentUser.uid, id)).then(() => history.push('/dashboard'))} className="bg-black active:bg-black uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                  Are you sure?
                                </button>
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-1">
                              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{bike.totalKm}</span><span className="text-sm text-blueGray-400">Total KM</span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{Object.keys(bike.records).length}</span><span className="text-sm text-blueGray-400">Total Refuels</span>
                                </div>
                                <div className="lg:mr-4 p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{bike.totalLiters}</span><span className="text-sm text-blueGray-400">Total Liters Put</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-12">
                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                              {bike.name}
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                              Average consumption: {(bike.totalKm - bike.startKm) / bike.totalLiters} Km/l
                            </div>
                          </div>
                          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                              <div className="w-full lg:w-9/12 px-4">
                                <Line data={data} options={options} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </section>
                </main>
              </div>
            }
        </div>
    )
}

export default BikePage

//TODO: remove useState
//TODO: delete subcollection
//TODO: fix triggers navbar mobile
//TODO: tooltips label
//TODO: maybe sort records
//TODO: deleted message