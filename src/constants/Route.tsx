import React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import Login from 'src/container/Login';
import { AiFillDashboard } from 'react-icons/ai';
import CheckTrackingHM from 'src/container/CheckTrackingHM';
import Register from 'src/container/Register';
import ToolAutoChangeTextHM from 'src/container/ToolAutoChangeTextHM';
import UserHmManager from 'src/container/hm-manager/UserHmManager';
import ProgressAutoOrder from 'src/container/hm-manager/ProgressAutoOrder';
import ExportExcel from 'src/container/hm-manager/ExportExcel';
import { FaFileCsv } from 'react-icons/fa';
export enum TypeScreen {
    public = 'public',
    admin = 'admin',
    authen = 'authen',
    afi = 'afi',
    toolHm = 'toolHm',
}

export const routers: RouteComponent[] = [
    {
        component: Login,
        label: 'Login',
        link: '/login',
        typeAuthen: TypeScreen.public,
        icon: <AiFillDashboard />,
    },
    {
        component: ToolAutoChangeTextHM,
        label: 'Tool change text',
        link: '/tool-change-text',
        typeAuthen: TypeScreen.afi,
        icon: <AiFillDashboard />,
    },
    {
        component: UserHmManager,
        label: 'User HM',
        link: '/user-hm',
        typeAuthen: TypeScreen.afi,
        icon: <AiFillDashboard />,
    },
    {
        component: ProgressAutoOrder,
        label: 'Progress',
        link: '/progress-order/:userHmId',
        typeAuthen: TypeScreen.afi,
        icon: <AiFillDashboard />,
    },
    {
        component: ExportExcel,
        label: 'Export Data',
        link: '/export-data',
        typeAuthen: TypeScreen.toolHm,
        icon: <FaFileCsv />,
    },
    {
        component: Register,
        label: 'Register',
        link: '/register-afi',
        typeAuthen: TypeScreen.public,
        icon: <AiFillDashboard />,
    },
    {
        component: CheckTrackingHM,
        label: 'Check Tracking',
        link: '/check-tracking',
        typeAuthen: TypeScreen.admin,
        icon: <AiFillDashboard />,
    },
];

// export const getRouteByRole = (role: Role): string => {
// 	if (role === Role.ADMIN) return "/business";
// 	if (role ===  Role.BUSINESS) return "/customer";
// 	else return "/search-tracking";
// };
export const routersMap = new Map(routers.map((item) => [item.link, item]));

export interface RouteComponent {
    link: string;
    component: React.ComponentType<any> | React.ComponentType<RouteComponentProps<any, StaticContext, any>>;
    typeAuthen: TypeScreen;
    icon: React.ReactElement;
    label: string;
}
