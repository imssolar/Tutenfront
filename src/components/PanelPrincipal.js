import React, { Fragment, useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import axios from 'axios';
import { URL_API } from '../services/ApiRest';



const PanelPrincipal = () => {


    const [data, setData] = useState([]);
    const [error, guardarError] = useState()
    const email = 'contacto@tuten.cl';


    const columns = [
        { title: 'BookingId', field: 'bookingId' },
        { title: 'Cliente', field: '',render:rowData=>{return (
            <div
              
            >
              {rowData.locationId.tutenUser.firstName} {rowData.locationId.tutenUser.lastName}
            </div>
          )}},
        { title: 'Fecha de Creación', field: 'bookingTime' },
        { title: 'Dirección', field: 'locationId.streetAddress' },
        { title: 'Precio', field: 'bookingPrice' }
    ];

    useEffect(() => {
        let url = `${URL_API}user/${email}/bookings`;
        axios.get(url, {
            params: {
                current: true
            },
            headers: {
                "Content-Type": "application/json",
                "adminemail": localStorage.email,
                "token": localStorage.token,
                "app": 'APP_BCK'
            }
        })
            .then(response => {
                console.log(response.data)
                setData(response.data)
            }).catch(error => {
                guardarError(error);
            })
    }, [])

    return (


        <MaterialTable
            title="Booking Data"
            data={data}
            columns={columns}
        />

    );
}

export default PanelPrincipal;