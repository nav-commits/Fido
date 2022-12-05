import React from 'react';
import './FilterContent.css';
import Filter from '../../Molecules/Filter/Filter';

function FilterContent({
    filters,
    onChange,
    increase,
    decrease,
    filterCounter,
    filterNames,
    showLengthEachLabel,
    onCheckedFilters,
    filterCount,
    position,
    bottom,
    left,
    width,
    paddingRight,
}) {
    return (
        <div style={{ position: position, bottom: bottom, left: left, paddingRight: paddingRight }}>
            <Filter
                filters={filters}
                onChange={onChange}
                increase={increase}
                decrease={decrease}
                filterCounter={filterCounter}
                filterNames={filterNames}
                showLengthEachLabel={showLengthEachLabel}
                onCheckedFilters={onCheckedFilters}
                filterCount={filterCount}
                width={width}
            />
        </div>
    );
}

export default FilterContent;
