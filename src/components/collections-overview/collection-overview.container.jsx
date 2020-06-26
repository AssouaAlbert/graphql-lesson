import React from 'react'
import { Query } from 'react-apollo';
import {gql} from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`{
    collections {
        id
        title
        items{
            id
            imageUrl
            price
            name
        }
    }

}`


const CollectionsOverviewContainer = () => (
    <Query query={GET_COLLECTIONS}> 
        {
            ({loading, error,data}) => {
                if(loading) return <Spinner/>
                return <CollectionsOverview collections={data.collections}/>




            }
        }
    </Query>
)
    //! The query key will give us return an object with multiple values... What we need will be de-structured
    //! Note that this is similar to the Context Consumer which was used before

export default CollectionsOverviewContainer;