import React, { useState, useEffect } from "react";
import './DetailedPage.css';
import Table from "../../components/Table/Table";

function HomePage(props) {
    return (
        <div className="DetailedViewContent">
            <div className="DetailedViewContainer">
                <div className="gridContainer">
                    <div className="DetailedViewHeader">Germany</div>
                    <div className="table DetailedViewGridItem">table</div>
                    <div className="smallBit1 DetailedViewGridItem">smallbit1</div>
                    <div className="smallBit2 DetailedViewGridItem">smallbit2</div>
                    <div className="chart1 DetailedViewGridItem">chart1</div>
                    <div className="chart2 DetailedViewGridItem">chart2</div>
                </div>
            </div>
        </div>

    );
}

export default HomePage;