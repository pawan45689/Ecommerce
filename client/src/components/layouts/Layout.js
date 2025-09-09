import Header from './Header';
import Footer from './Footer';
import{ Helmet} from "react-helmet"
import {Toaster} from "react-hot-toast"
const Layout = ({children, title, description, keywords, author}) => {
    return(
        <>
        <Helmet>
            <meta charset = "utf-8"/>
            <meta name ="description" content={description} />
            <meta name = "keywords" content={keywords}/>
            <meta name = "author" content={author}/>
            <title>{title}</title>
            </Helmet>
           <Header/>
            {/* <main style={{minHeight: "70vh"}}/> */}
            <Toaster/>
            {children}
        
        <Footer/>
        </>
    )
}
Layout.defaultProps ={
    title:"Ecommesce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Pawan"
}
export default Layout;