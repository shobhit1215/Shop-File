const get404page=(req,res,next)=>{
    //res.status(404).sendFile(path.join(__dirname,'Views','Error.html'));
    //res.status(404).sendFile(path.join(__dirname,'Views','Error.html'));
    res.status(404).render('Error.ejs',{docTitle:'Error',path:'/404'});
}