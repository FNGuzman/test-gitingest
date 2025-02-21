import React from 'react';
import AppSidebar from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { useMenuToggle } from '@hooks/useMenuToggle';

interface IProps {
    children?: React.ReactNode;
}

export const DashboardLayout = ({ children }: IProps) => {
    const { isOpenMenu, handleToggleMenu } = useMenuToggle();

    return (
        <div className={`layout-wrapper layout-static p-ripple-disabled ${isOpenMenu ? 'layout-menu-open layout-mobile-active' : 'layout-static-inactive'}`}>
            <AppTopbar />
            {isOpenMenu && (
                <>
                    <div className="layout-sidebar">
                        <AppSidebar />
                    </div>
                    <div className="layout-mask" onClick={handleToggleMenu}></div>
                </>
            )}
            <div className="layout-main-container">
                <div className="layout-main">
                    {children}
                </div>
            </div>
        </div>
    )
}
