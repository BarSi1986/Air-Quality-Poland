import React from 'react'

// dependencies
import styled from 'styled-components'

// STYLES --------------------------------
const ListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 50px;
    padding-inline-start: 0px;

    @media (max-width: 450px) {
        margin-top: 120px;
        width: 90%;
  }
    li{
        margin: 5px;
        list-style: none;
        padding: 10px 30px;
        background: #e0e0e0;
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
        border: none;
        padding: 16px;
        font-size: 1rem;
        border-radius: 4px;
        animation: fadeIn .3s ease-out;
        .border{
            border-bottom: 1px solid;
        }
    }

    @keyframes fadeIn {
        from{
            opacity: 0;
            transform: translateY(12px);
        }
        to{
            opacity: 1;
            transform: translateY(0px);
            }
    }
`
const warning = {
    color: 'red',
    fontWeight: 'bold'

}

const safe = {
    color: 'green',
    fontWeight: 'bold'
}

// component
const ListElement = ({ cityDetails, isclicked }) => {


    const listItem = cityDetails.map(item =>
        < li key={item.location}>
            <p>badany parametr: stężenie pyłów zawieszonych {item.parameter}</p>
            <p>punkt pomiaru: {item.location}</p>
            <p>data pomiaru: {new Date(item.date.local).toLocaleDateString()}</p>
            <p style={item.value > 50 ? warning : safe}>wynik pomiaru: {item.value} {item.unit}</p>
            <p>poziom dopuszczalny: 50 µg/m3 (dobowy);</p>
            <div className="border"></div>
            {item.value > 50 ? <p style={item.value > 50 ? warning : safe}>!!! stężenie pyłów przekracza dopuszczalną wartość, lepiej zostać w domu</p> : <p style={item.value > 50 ? warning : safe}>jakość powietrza w normie, możesz swobodnie wyjść na zewnątrz</p>}
        </li >
    )

    return (
        <ListWrapper>
            {Array.isArray(cityDetails) && cityDetails.length === 0 && isclicked ?
                <li>
                    <p>brak danych z wybranej lokalizacji</p>
                </li>

                : listItem}
        </ListWrapper>

    )
}

export default ListElement
