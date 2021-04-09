import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";
import './admin.css';
import { NavItem } from '../NavItem/NavItem';
import Category from '../category/categories';
import UserPWrapper from '../../containers/UsersWrapper';
import UnitOfMeasuring from '../unitOfMeasuring/unitsOfMeasuring';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import UsersPWrapper from '../../containers/UserSearchWrapper';
import { connect } from 'react-redux';

export default class Admin extends Component {
    render() {
        return (
            <>
                <div className="admin-panel row">
                    <h3>Admin Panel</h3>
                </div>
                <div className="row h-100">
                    <div className="admin-sidebar col-sm-2">
                        <ul className="list-unstyled">
                            <nav id="sub-nav">
                                <div>
                                    <NavItem
                                        to={'/admin/categories/'}
                                        icon={'fa fa-hashtag'}
                                        text={"Categories"}
                                    />
                                </div>
                                <div>
                                    <NavItem
                                        to={'/admin/unitsOfMeasuring/'}
                                        icon={'fa fa-plus'}
                                        text={"UnitsOfMeasuring"}
                                    />
                                </div>
                                <div>
                                    <NavItem
                                        to={'/admin/users?page=1'}
                                        icon={'fa fa-users'}
                                        text={"Users"}
                                    />
                                </div>
                            </nav>
                        </ul>
                    </div>
                    <div className="col-sm-9 offset-sm-1">
                        <Route
                            exact
                            path='/admin'
                            render={() =>
                                <Redirect to={`/admin/categories`} />} />
                        <Route path="/admin/categories/" component={withAuthRedirect(['Admin'])(Category)} />
                        <Route path='/admin/unitsOfMeasuring' component={withAuthRedirect(['Admin'])(UnitOfMeasuring)} />
                        <Route path="/admin/users" component={withAuthRedirect(['Admin'])(UserPWrapper)} />
                    </div>
                </div>
            </>
        );
    }
}