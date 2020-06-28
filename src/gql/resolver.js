/**
 * # Remember the diagram from logic behind gql and apollo? 
 * ? Resolvers are used object we parse to our clients,...
 * ? to resolve what values get called depending on what queries or mutations are parsed by the client side.
 * 
 */
import {gql} from 'apollo-boost';

//# Defining the schema (for both quesry and or mutation) that the client will use
//? Extend means extend the existing (if it doesnot exist it will just create one on client) type of mutation that might exist the backend
export const typeDefs = gql`
    extend type Item {
        quantity: Int!
        }
    extend type Mutation {
        ToggleCatHidden: Boolean!,
        AddItemToCart(item: Item!): []
    }
`;

//* @client is used to indicate that the calue is on the client side
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`
/**
 * ? this object will define what are mutation, queries as well as what additional types we have on a client side cace that appolo has access to
 */

export const resolvers = {
    //! Read about Apollo GQL to understand this topic
    Mutation: {
        //! Arguments with _ should not be modified. This is how they do it inside the apollo docs
        /**
         * ? _root: represents the top level object  that holds the actual types. e.d collect item from collections
         * ? _args: are normal arguments
         * ? _context: are things the apollo client has access to e.g. the cache and client (This is what we need we will destructure the cahe from it)
         * ? _info: has information about the query 
         */
        //# toggleCartHidden: (_root, _args, _context, _info) => {
            
        toggleCartHidden: (_root, _args, {cache}, _info) => {
            
            //# const data =  cache.readQuery({ // The cartHidden is destructured from the cache
            const {cartHidden} =  cache.readQuery({
                query: GET_CART_HIDDEN
            });
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden}
            });
            return !cartHidden;
        },
        AddItemToCart: (_root, {item}, {cache}, __info) 
    }
}