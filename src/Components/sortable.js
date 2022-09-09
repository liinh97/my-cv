import React, { Component, useContext } from 'react';
import TextContext from '../Context/TextContext';
import DragSortableList from "react-drag-sortable";
import ItemBox from "../Components/item-box";

const InfoBox = ({value}) => {

    const { text, setText } = useContext(TextContext);

    return (
        <div
            onClick={() => {setText('information.' + value.name)}}
            className="infomartion"
            >{value.value}
        </div>
    )

};

const ChildBox = ({value}) => {

    return value.item_child.map( (e, i) => {
        const query = 'item_box.' + value.name + '.item_child.' + e.sort;
        return (
            <div key={i} className={ 'item_' + e.sort + ' item_box'}>
                <div
                    className={'item_box_time'}
                    >{e.time}
                </div>
                <div className={'item_box_desc'}>
                    <div
                        className={'item_box_desc-title'}
                        >{e.title}
                    </div>
                    <div
                        className={'item_box_desc-content'}
                        >{e.content}
                    </div>
                </div>
            </div>
        )
    })

    // return <ItemBox key={value.name} data={value} />
}

export class SortableComponent extends Component {

    state = {
        items: []
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.items !== this.props.items) {

            this.tag = nextProps.tag;

            const items = [];

            nextProps.items.map( item =>
                items.push({
                    content: nextProps.tag == 'info' ? 
                        <InfoBox value={item} /> : <ChildBox value={item}/>
                })
            );

            this.setState({ items });
        }
    }

    render() {

        return (
            
            this.tag == 'child' ?
                <DragSortableList moveTransitionDuration={0.1} items={this.state.items} /> :
                <div>
                    <DragSortableList moveTransitionDuration={0.1} items={this.state.items} />
                </div>
        )
    }
}