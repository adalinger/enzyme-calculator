import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {InfoCircle} from 'react-bootstrap-icons'
import React, {ReactNode} from "react";

interface TooltipComponentProps {
    children: ReactNode
}

export function TooltipComponent(props: TooltipComponentProps): React.JSX.Element {
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={
                <Tooltip id="button-tooltip">
                    {props.children}
                </Tooltip>}>
            <InfoCircle className="mx-3"/>
        </OverlayTrigger>
    )
}