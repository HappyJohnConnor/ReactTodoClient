import React, { Component } from 'react';

const Form = (porps) => (
    <form onSubmit={porps.handleAdd}>
        <div>
            <label>Your todo:</label>
            <input name="title" type="text" />
            <input type="submit" value="Add" />
        </div>
    </form>
);

export default Form;