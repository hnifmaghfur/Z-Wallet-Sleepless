import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut, icPlus,icUserActive, icTrash} from '../../assets';
import { Navbar,Footer, NavigationMobile} from '../../component/molecules';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './managePhoneNumber.css';
import qs from 'qs';
import{connect} from 'react-redux';


class ManagePhoneNumber extends Component {

    state = {
        data:[],
        phone:'-'
    }

    componentDidMount()
    {
  
              if (this.props.userData.phone === '-') {
                 this.props.history.push('/profile/add-phone-number')
              } 
    }
    deleteNumber(id)
    {
        let data = {
            phone : '-'
        }
        data = qs.stringify(data);
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
        axios.patch(`${process.env.REACT_APP_API}/profile/${id}`,data,headers)
        .then(res => {
          console.log(res.data)
          if (res.data.success === true) {
                 this.props.history.push('/profile/add-phone-number')
          }
        })
        .catch(err => {
          console.error(err)
        });
    }


    render() { 
        if (this.props.userData.phone === '-') {
            this.props.history.push('/profile/add-phone-number')
         } 
        return ( 
            <>
                <div className="d-none d-sm-block">
                      <Navbar/>
                </div>

                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg sidebar_menu">
                              <div class="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                                 <div style={{flex: 1}}>
                                   <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-pr text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer-pr text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-pr text-center text-lg-left" >
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/profile">
                                    <a href="/" className="ml-md-4 d-block profile-pr text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icUserActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    </div>
                                    <a href="/auth/logout" className="ml-md-4 d-block logout-rc text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">

                                <div class="body-area-manage-number"> 
                                <div className="d-block d-sm-none">
                                      <NavigationMobile page="Manage Phone Number" to="/profile"/>
                                </div>
                                    <div class="row ">
                                        <div class="col-12">
                                            <h1 className="d-none d-sm-block">Manage Phone Number</h1>
                                            <p className="text-center text-sm-left">You can only delete the phone number and then you must add another phone number.</p>

                                            <div class="primary-number">
                                                <span>Primary</span>
                                                <h2>{this.props.userData.phone}</h2>
                                                <div className="delete-number" onClick={() => this.deleteNumber(this.props.userData.id)}>
                                                    <img alt="" src={icTrash}/>
                                                </div>
                                            </div>
                                            

                                        </div>

                                    </div>
                                </div>               
 

                            </div>

                        </div>
                    </div>                                              
                <Footer/>
            </>
         );
    }
}
 


const mapStateToProps = (state) => {
    return {
        userData: state
    }
}


export default connect(mapStateToProps)(ManagePhoneNumber);