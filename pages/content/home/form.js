import React from 'react';
import Form from 'react-bootstrap/Form';
const Formfilter = () => {
  const listofcategory = ['Programming', 'Business', 'Data', 'Design'];

  return (
    <div>
        <h2  style={{ marginBottom:"18px"}}><b>Category</b></h2>
      {listofcategory.map((data) => {
        console.log(data);
        return (
          <Form.Group controlId="formBasicCheckbox" style={{marginBottom: "0px"}}>
            <Form.Check type="checkbox" label={data} />
          </Form.Group>
        );
      })}
    </div>
  );
};

export default Formfilter;
