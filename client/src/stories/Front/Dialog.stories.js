import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogButton, DialogTitle} from '../../components/dialog'

export default {
    title: 'Front/Composite/Dialog',
    component: Dialog
}

const Template = args => <Dialog {...args}>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>Some actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actionSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions heres hereSome actions hereSome actions hereSome actions hereSome actions here</DialogContent>
        <DialogActions>
            <DialogButton label="Ok" raised/>
            <DialogButton label="Cancel" outlined/>
        </DialogActions>
    </Dialog>


export const Base = Template.bind({})

Base.args = {
    open: true,
    onClosed: () => console.log('Dialog closed!')
}

export const FullWidth = Template.bind({})
FullWidth.args = {
    ...Base.args,
    fullWidth: true
}

export const RootChildren = Template.bind({})
RootChildren.args = {
    ...Base.args,
    rootChildren: "rooot Children"
}

export const NoCloseBtn = Template.bind({})
NoCloseBtn.args = {
    ...Base.args,
    noCloseIcon: true
}
