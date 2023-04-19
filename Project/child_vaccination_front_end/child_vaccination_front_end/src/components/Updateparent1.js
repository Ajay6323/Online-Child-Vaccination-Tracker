import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';


export default function Updateparent1() {
    const [parent, setParent] = useState(JSON.parse(localStorage.getItem("loggedinuser")));
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();
    const location = useLocation()
    const data = location.state

    useEffect(() => {
        setAddress(parent.address)
        setEmail(parent.email)
        setMobile(parent.mobile)

    }, [])


    function handleUpdateProfile(event) {
        event.preventDefault();

        try {
            const data = {
                address: address,
                email: email,
                mobile: mobile
            }
            alert(address+"        "+email+"       "+mobile)

            axios
                .patch(`http://localhost:9090/parent/updateparent/${parent.pid}`, data)
                .then(response => {
                    alert("Updated  Successful!")
                    history.push("/parenthome");
                })

        } catch (error) {
            alert(`Couldn't Update User Profile. Please try again. Error: ${error}.`);
        }
    }
    function backtoHome (e) {
        e.preventDefault();
        history.push("/parenthome");
    }

    return(
        <div>
        <button class="btn btn-primary col-md-1" type="button" onClick={backtoHome} style={{ float: "right" }} >Back</button><br/>
        <div className="container"><br />
        
            <h1 className="header2">Parent Updation</h1>

            <form>
                <div className="form-group" class="col-md-3">
                    <label className="lb" for="email"> EmailID :</label>
                    <input type="text" id="email" className="form-control" 
                    value={email} name="email" 
                    onChange={event => setEmail(event.target.value)} />
                </div>
                <div className="form-group" class="col-md-3">
                    <label className="lb" for="mobile">Enter Contact No. :</label>
                    <input type="number" id="mobile" className="form-control" 
                    value={mobile} name="mobile"
                    onChange={event => setMobile(event.target.value)} />
                </div>


                <div className="form-group" class="col-md-3">
                    <label className="lb" for="address">Enter Address :</label>
                    <input type="text" id="address" className="form-control" 
                    value={address} name="address"  onChange={event => setAddress(event.target.value)} />
                </div>

                <br></br>
                <div className="form-group" class="col-md-3">
                    <button type="button" onClick={handleUpdateProfile} class="btn btn-primary col-md-5" style={{ marginLeft: "25px" }}>Update</button>
                </div>
            </form>
        </div>

    </div>
    )

}