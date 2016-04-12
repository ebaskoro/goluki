/**
 * changing.js
 *
 */

 import React from 'react';
 import FontAwesome from 'react-fontawesome';

 /**
  * Changing component.
  *
  */
 class Changing extends React.Component {

   /**
    * Renders the component.
    *
    */
   render() {
     return (
       <div>
         Changing <FontAwesome name="spinner" spin size="lg" />
       </div>
     );
   }
 }

 export default Changing;
