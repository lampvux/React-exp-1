import React, {   useEffect, useState } from 'react';
import './slide.css'
const slideRef = React.createRef();
function Slide() {

    const [mouseDownAt, setMouseDown] = useState(0);
    const [prevPercentage, setPrevPercentage] = useState(0);
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        const onMouseDown = e => {
            setMouseDown( e.clientX )       
        }
        window.addEventListener('mousedown', onMouseDown)
        window.ontouchstart = e =>  onMouseDown(e.touches[0])

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('ontouchstart', onMouseDown);
        }
    }, [mouseDownAt])

    useEffect(() => {
        const onMouseUp = _e => {
            setMouseDown(0)
            setPrevPercentage(percentage)
        }
        window.addEventListener('mouseup', onMouseUp)
        window.ontouchend = e =>  onMouseUp(e.touches[0])
        return () => {
            window.removeEventListener('mouseup', onMouseUp );
            window.removeEventListener('ontouchend',onMouseUp );
        }
    }, [ prevPercentage, percentage ])

    useEffect(() => {
        const onMouseMove = e => {
            if (mouseDownAt === 0) return;
    
            const mouseDelta = parseFloat(mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;
            const percent = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(prevPercentage) + percent,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
            setPercentage(nextPercentage);
            slideRef.current.animate({ transform: `translate(${nextPercentage}%, -50%)` }, { duration: 1500, fill: "forwards" });
    
            for (const image of slideRef.current.getElementsByClassName('image')) {
                image.animate({ objectPosition: `${100 + nextPercentage}% center` }, { duration: 1500, fill: "forwards" });
            }
        }
        window.addEventListener('mousemove', onMouseMove)
        window.ontouchmove = e =>  onMouseMove(e.touches[0])
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('ontouchmove', onMouseMove);
        }
    }, [mouseDownAt, percentage, prevPercentage ])
   
    return (
        <div id="image-track" data-mouse-down={mouseDownAt} data-prev-percentage={prevPercentage} ref={slideRef} >
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1558929996-da64ba858215?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" />
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80" />
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80" />
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1541876176131-3f5e84a7331a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" />
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
            <img className="image" alt="card" draggable="false" src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" />

        </div>
    );

}
export default Slide;
