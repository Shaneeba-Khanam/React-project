const Logout=()=>{  
    localStorage.clear()
    return(
        <a href='/login' className="btn btn-danger btn-sm mb-2" style={{float:"right"}}>
        <span className="fa fa-sign-out"></span> Log out</a>
    )
}

export default Logout;