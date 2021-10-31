import React from 'react';

const ListUsers = React.lazy(() => import("../components/admin/users/List"));

const adminRoutes = [
    { path: '/admin/users/list', exact: true, name: 'Користувачі', component: ListUsers  }
];
export default adminRoutes;