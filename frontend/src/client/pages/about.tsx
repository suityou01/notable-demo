import { NextPage } from 'next';

const About: NextPage = () => {
    return (
        <>
            <h1>About this app</h1>
            <p>This app was put together to showcase using Nest and Next together.</p>
            <p>This page will be rendered at build time by next js and will be served as a static HTML file</p>
            <p>This is known as SSG - <a href='https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation'>Static Site Generation</a></p>
        </>
    )
}

export default About;