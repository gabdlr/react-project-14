import React from 'react';
import Header from './Header';
import GlobalStyle from '../../pages/globalStyles';
import Head from 'next/head';
const Layout = (props) => {
    return (
        <>  
            <Head>
                <title>Product hunt clone with NextJS & firebase</title>
                <link 
                    rel="stylesheet" 
                    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" 
                    integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" 
                    crossOrigin="anonymous" 
                    referrerpolicy="no-referrer" 
                />
            </Head>
            <GlobalStyle/>
            <Header/>
            <main>
                {props.children}
            </main>
        </>
     );
}
 
export default Layout;