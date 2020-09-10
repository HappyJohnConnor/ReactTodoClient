import React, { Component } from 'react';

const Form = (porps) => (
    <form onSubmit={porps.handleAdd}>
        <div>
            <input name="title" type="text" placeholder="add your todo"/>
            <input type="submit" value="Add" />
        </div>
    </form>
);

export default Form;