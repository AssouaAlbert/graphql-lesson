import React from 'react'
import { Query } from 'react-apollo';
import {gql} from 'apollo-boost';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

const GET_COLLECTION_BY_TITLE = gql`
    query getCollectionsByTitle($title: String!) {
            getCollectionsByTitle(title: $title) {
                title
                id
                items{
                    name
                    id
                    imageUrl
                    price
                }
            }
        }
`

const CollectionPageContainer = ({match}) => (
    <Query
        query={GET_COLLECTION_BY_TITLE} 
        variables={{title: match.params.collectionId
        }}>
        {
            ({loading, data: {getCollectionsByTitle}}) => {
                loading? <Spinner/>:<CollectionPage collection={getCollectionsByTitle}/>
            }
        }
    </Query>
)

export default CollectionPageContainer;