import React, { useState , useEffect , useRef } from 'react';
import { findFilterCounts } from './../pages/dashboard/DashboardHelper';
import 'font-awesome/css/font-awesome.min.css';

function CustomMultiSelect({ setTruckList , setSortedTruck , sortedTruck , filterTrucks , setActiveTab }) {
    const [ optionStatus , setOptionStatus ] = useState({
        selectedOptions: [],
        allOptions: []
    });
    const [ updateData , setUpdateData ] = useState([]);
    const [ searchFilter , setSearchFilter ] = useState('');
    const [ filteredArray , setFilteredArray ] = useState([]);
    const [ selectStatus , setSelectStatus ] = useState('none');  
    const selectionArea = useRef();

    useEffect(()=>{
        if(updateData !== optionStatus.selectedOptions) {
            setOptionStatus({
                allOptions: sortedTruck.totalTruck,
                selectedOptions: []
            });
        }
    },[sortedTruck]);
    
    useEffect(()=>{
        if(optionStatus.selectedOptions.length === 0) {
            setTruckList(optionStatus.allOptions);
            changeHeaderFilterData(optionStatus.allOptions);
        } else {
            setTruckList(optionStatus.selectedOptions);
            changeHeaderFilterData(optionStatus.selectedOptions);
        }
        setActiveTab('totalTruck');
    },[updateData]);

    const setOptionSelected = (id) => {
        let tempAllOptions = [];
        let tempSelectedOptions = [...optionStatus.selectedOptions];
        optionStatus.allOptions.map((value) => {
            if(value.truckNumber !== id) tempAllOptions.push(value);
            else tempSelectedOptions.push(value);
        });
        setOptionStatus({ allOptions: tempAllOptions, selectedOptions: tempSelectedOptions });
        setUpdateData(tempSelectedOptions);
    }

    const setOptionUnselect = (id) => {
        let tempAllOptions = [...optionStatus.allOptions];
        let tempSelectedOptions = [];
        optionStatus.selectedOptions.map((value) => {
            if(value.truckNumber !== id) tempSelectedOptions.push(value);
            else tempAllOptions.push(value);
        });
        if(optionStatus.selectedOptions.length === 0) {
            setOptionStatus({ allOptions: sortedTruck.totalTruck, selectedOptions: tempSelectedOptions });  
            filteredArray([]);
        } else {
            setOptionStatus({ allOptions: tempAllOptions, selectedOptions: tempSelectedOptions });
        }
        setUpdateData(tempSelectedOptions);
    }

    const changeHeaderFilterData = (data) => {
        let response = findFilterCounts(data);
        setSortedTruck(response);
    }

    const handleSearchFilter = (e) => {
        setSearchFilter(e.target.value);
        let filtered_array = [];
        filtered_array = optionStatus.allOptions.filter((value) => value.truckNumber.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredArray(filtered_array.length === 0 ? [] : filtered_array);
    }

    const handleSelectToggle = () => {
        if(selectStatus === 'none') {
            setSelectStatus('inline-block');
            document.addEventListener('click' , handleCloseSelect , true);
        } else {
            setSelectStatus('none');   
            document.removeEventListener('click' , handleCloseSelect , true);
        }
    }

    const handleCloseSelect = (e) => {
        if(selectionArea.current !== null && selectionArea.current.contains(e.target) === false) {
            setSelectStatus('none');
        }
    }

    return (
        <>
            <div className="custom_multiselect_container select_margin select_multiselect" style={{ display: selectStatus === 'none' ? 'block' : 'none' }} onClick={ handleSelectToggle }>
                Select <span className="custom_multiselect_caret"> <i className="fa fa-caret-down"></i> </span>
            </div>
            <div className="custom_multiselect_container select_margin" style={{ display: selectStatus }} ref={selectionArea}>
                <div className="selected_option_multiselect ">
                    <ul>
                        {optionStatus.selectedOptions.map((value) => {
                            return <li key={value.truckNumber} id={value.truckNumber} onClick={ () => setOptionUnselect(value.truckNumber) } > {value.truckNumber} </li>
                        })}
                    </ul>
                </div>
                <div className="select_multiselect">
                    <input type="text" onChange={ handleSearchFilter } value={searchFilter} placeholder="Search" /> 
                </div>
                <div className="selected_area_multiselect">
                    <ul>
                        {(searchFilter.length !== 0 ? filteredArray : optionStatus.allOptions).map((value) => {
                            return <li key={value.truckNumber} id={value.truckNumber} onClick={ (e) => setOptionSelected(value.truckNumber) } > {value.truckNumber} </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CustomMultiSelect;