import React, { Component } from 'react';

import Button from '../button';
import Card from '../card';
import {Dialog, DialogActions, DialogContent, DialogButton, DialogTitle} from '../dialog';
import IconButton from '../icon-button';
import Checkbox from '../checkbox';
import Select from '../select';
import Radio from '../radio';
import TextField from '../text-field';
import Typography from '../typography';
// import List from '../list';
import Chapter from '../chapter';
import {Menu} from '../menu';
import Spoiler from '../spoiler';
import Tab from '../tab';
import TabBar from '../tab-bar';
import Comment from '../comment';
import MenuSurface from '../menu-surface';
import MenuSurfaceAnchor from '../menu-surface-anchor';
import CommentInput from '../comment-input';
import VolumeItem from '../admin/volume-item';
import ChapterItem from '../admin/chapter-item'

import { 
    List, 
    ListItem, 
    ListGroupSubheader, 
    ListGroup, 
    ListDivider, 
    ListItemMeta, 
    ListItemGraphic, 
    ListItemText, 
    ListItemPrimaryText,
    ListItemSecondaryText } from '../list';

import Link from '../link';

import './ui-kit-page.scss';

export default class UiKitPage extends Component {
    state={
        open: false,
        tooltipOpen: false
    }
    
    render(){
        return (
            <div className="ui-kit-page">
                <h2>Links</h2>
                <div className="button container">
                    <Link href="#" type="header-nav">Header link</Link>
                </div>
                <div className="button container">
                    <Link href="#" type="header-nav" accentuated>Header link (accentuated)</Link>
                </div>
                <div className="button container">
                    <Link href="#" type="footer-nav">Footer Link</Link>
                </div>
                <div className="button container">
                    <Link href="#" type="action">Reply</Link>
                </div>
                <div className="button container">
                    <Link href="#" type="action" accentuated>Read All</Link>
                </div>
                <h2>Buttons</h2>
                <div className="button container">
                    <Button label="link" tag="a" href="#"/>
                </div>
                <div className="button container">
                    <Button label="label"/>
                </div>
                <div className="button container">
                    <Button label="disabled" disabled/>
                </div>
                <div className="button container">
                    <Button icon="favorite">like</Button>
                </div>
                <div className="button container">
                    <Button trailingIcon="favorite">trailing like</Button>
                </div>
                <div className="button container">
                    <Button  label="disabled" outlined disabled/>
                </div>
                <div className="button container">
                    <Button  label="label" outlined />
                </div>
                <div className="button container">
                    <Button  label="disabled" raised disabled/>
                </div>
                <div className="button container">
                    <Button  label="label" raised unelevated />
                </div>

                <h2>Icon Buttons</h2>
                <div className="button container">
                    <IconButton icon="search" withRipple/>
                </div>
                <h2>Icon Buttons (with toggle off)</h2>
                <div className="button container">
                    <IconButton icon="search" onIcon="favorite" onChange={(e) => {console.log('icon button toggled, e', e)}}/>
                </div>
                <h2>Icon Buttons (with toggle on)</h2>
                <div className="button container">
                    <IconButton icon="search" onIcon="favorite" isOn/>
                </div>

                <h2>Cards</h2>
                <div className="card container">
                    <Card 
                        title="Hey everybody!" 
                        text="<div>In case you haven\'t heard, <br>I opened a Patreon account!💡💡💡There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text." 
                        imgs={'images/happyNY.png'}
                        views={123} 
                        date="1m ago" />
                </div>

                <div className="card container">
                    <Card 
                        title="New t-shirts arrived!" 
                        text="Description text" 
                        views={123} 
                        date="2 days ago" />
                </div>
                <div className="card container">
                    <Card 
                        imgs={'images/happyNY.png'}
                        views={123} 
                        date="1m ago" />
                </div>


                <h2>Dialog</h2>
                <Dialog>
                    <DialogTitle>
                        <Typography use="headline3">Dialog title</Typography>
                    </DialogTitle>
                    <DialogContent>Some actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actionSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions hereSome actions heres hereSome actions hereSome actions hereSome actions hereSome actions here</DialogContent>
                    <DialogActions>
                        <DialogButton label="Ok" raised/>
                        <DialogButton label="Cancel" outlined/>
                    </DialogActions>
                </Dialog>


                <h2>Checkbox</h2>
                <Checkbox />
                <Checkbox label="hey"/>

                <h2>Select</h2>
                <div className="select container">
                    <Select 
                        label="Select a fruit"
                        defaultValue="Apple"
                        options={['Apple', 'Pineapple', 'Lemon']}
                        onChange={() => {}} 
                    />
                </div>
                <div className="select container">
                    <Select 
                        label="Disabled select"
                        options={['Apple', 'Pineapple', 'Lemon']}
                        onChange={() => {}} 
                        disabled
                        outlined
                    />
                </div>
                <div className="select container">
                    <Select 
                        options={['English', 'Русский', 'Беларуская']}
                        onChange={() => {}} 
                        defaultValue={0}
                        icon="language"
                        simple
                    />
                </div>
                <div className="select container" style={{backgroundColor: 'gray', padding: 20}}>
                    <Select 
                        options={['English', 'Русский', 'Беларуская']}
                        onChange={() => {}} 
                        defaultValue={0}
                        icon="language"
                    />
                </div>
                <div className="select container" style={{backgroundColor: 'gray', padding: 20}}>
                    <Select 
                        options={['English', 'Русский', 'Беларуская']}
                        onChange={() => {}} 
                        defaultValue={0}
                        icon="language"
                        theme="light"
                        outlined
                    />
                </div>
                <div className="select container" style={{backgroundColor: 'gray', padding: 20}}>
                    <Select 
                        options={['English', 'Русский', 'Беларуская']}
                        onChange={() => {}} 
                        defaultValue={0}
                        icon="language"
                        theme="light"
                        simple
                    />
                </div>
                <div className="select container">
                    <Select 
                        label="Select a fruit"
                        options={['Apple', 'Pineapple', 'Lemon']}
                        onChange={() => {}} 
                        outlined
                    />
                </div>
                <div className="select container">
                    <Select 
                        label="Select fruit"
                        options={['Apple', 'Pineapple', 'Lemon']}
                        onChange={() => {}} 
                        icon="favorite"
                    />
                </div>
                <div className="select container">
                    <Select 
                        label="Select with default value"
                        options={['Apple', 'Pineapple', 'Lemon']}
                        onChange={() => {}} 
                        defaultValue={1}
                        icon="favorite"
                        outlined
                    />
                </div>
                <h2>Select - типы данных</h2>
                object map
                <div className="select container">
                    <Select 
                        options={{
                            '1': 'One',
                            '2': 'Two',
                            '3': 'Three',
                        }}
                        onChange={() => {}} 
                        defaultValue={2}
                    />
                </div>
                <div className="select container">
                    modified array
                    <Select 
                        label="Select with default value"
                        defaultValue={3}
                        options={[
                            {
                                label: "Level1",
                                value: 1
                            },
                            {
                                label: "Level1 - title",
                                options: [
                                    {
                                        label: "level2 - 1",
                                        value: 3
                                    },
                                    {
                                        label: "level2 - 2",
                                        value: 4,
                                        'aria-disabled': true,
                                        tabIndex: -1
                                    }
                                ]
                            },
                            {
                                label: "Level1",
                                value: 2,
                                'aria-disabled': true,
                                tabIndex: -1
                            }
                        ]}
                        onChange={() => {}} 
                        outlined
                    />
                </div>
                <h2>Radio</h2>
                <div className="container">
                    <Radio 
                        label="disabled"
                        name="Label1"
                        value="1"
                        disabled
                    />
                    <Radio 
                        label="2"
                        name="Label1"
                        value="2"
                        checked
                    />
                    <Radio 
                        label="3"
                        value="3"
                        name="Label1"
                    />
                 </div>
                 <h2>Text Fields</h2>
                 <div className="container">
                     <TextField label="label"  />
                 </div>
                 <div className="container">
                     <TextField placeholder="placeholder" outlined/>
                 </div>
                 <div className="container">
                     <TextField placeholder="placeholder fullWidths" fullWidth/>
                 </div>
                 <div className="container">
                     <TextField label="disabled" disabled/>
                 </div>
                 <div className="container">
                     <TextField label="label" value="pref-filled value"/>
                 </div>
                 <div className="container">
                     <TextField label="outlined" outlined />
                 </div>
                 <div className="container">
                     <TextField icon={{icon: "search"}} trailingIcon={{icon: "close", tabindex: 0}}  outlined />
                 </div>
                 <div className="container">
                     <TextField icon={{icon: "search", tabindex: 0}} trailingIcon={{icon: "close", tabindex: 0}} label="default" />
                 </div>
                 <div className="container">
                     <TextField label="label with help text" helpText="Help text" />
                 </div>
                 <div className="container">
                     <TextField label="textarea" maxLength="30" helpText="Help text" fullWidth textarea rows={7}/>
                 </div>
                 <h2>Drawer</h2>
                 <div className="container">
                     {/* <Drawer  open/> */}
                 </div>
                 <h2>Menu</h2>
                 <div className="container">
                    {/* <div id="demo-menu" class="mdc-menu-surface--anchor"> */}
                    <MenuSurfaceAnchor id="demo-menu">
                        <button id="menu-button" onClick={() => this.setState({open: !this.state.open})}>Open Menu</button>
                        <Menu open={this.state.open}>
                            <List twoLine>
                                <ListItem>Title 1</ListItem>
                                <ListItem>Title 2</ListItem>
                                <ListItem>Title 3</ListItem>
                            </List>
                        </Menu>
                    </MenuSurfaceAnchor>
                    {/* </div> */}
                 </div>
                 <h2>Menu Surface (example with tooltip)</h2>
                 <div className="container">
                    <MenuSurfaceAnchor>
                        <button 
                            onMouseOver={() => {console.log('mouse over tootlitp');this.setState({tooltipOpen: true})}}
                            onMouseOut={() => {this.setState({tooltipOpen: false})}}
                        >Opened Tooltip</button>
                        <MenuSurface 
                            anchorCorner='bottomStart' 
                            open={this.state.tooltipOpen}
                        >
                            <Typography use="headline3">I'm a tooltip</Typography>
                        </MenuSurface>
                    </MenuSurfaceAnchor>
                 </div>
                 <h2>List</h2>
                 <h4>Simple</h4>
                 <div className="container">
                    <List twoLine>
                        <ListItem selected>Title 1</ListItem>
                        <ListItem>Title 2</ListItem>
                        <ListItem>Title 3</ListItem>
                    </List>
                 </div>
                 <h4>List Group</h4>
                 <div className="container">
                     <ListGroup>
                         <ListGroupSubheader>Group 1</ListGroupSubheader>
                        <List twoLine>
                            <ListItem selected>
                                <ListItemText>
                                    <ListItemPrimaryText>Title 1</ListItemPrimaryText>
                                    <ListItemSecondaryText>Content</ListItemSecondaryText>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <ListItemPrimaryText>Title 2</ListItemPrimaryText>
                                    <ListItemSecondaryText>Content </ListItemSecondaryText>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <ListItemPrimaryText>Title 3</ListItemPrimaryText>
                                    <ListItemSecondaryText>Content</ListItemSecondaryText>
                                </ListItemText>
                                <ListItemMeta>NEW!</ListItemMeta>
                            </ListItem>
                        </List>
                        <ListDivider inner="false"/>
                        <ListGroupSubheader>Group 2</ListGroupSubheader>
                        <List twoLine avatarList>
                            <ListItem>
                                <ListItemGraphic icon={<img src="https://www.canva.com/wp-content/themes/canvaabout/img/colorPalette/image4.jpg" />} />
                                <ListItemText>
                                    <ListItemPrimaryText>Title 4</ListItemPrimaryText>
                                    <ListItemSecondaryText>Content</ListItemSecondaryText>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemGraphic icon={<img src="https://www.canva.com/wp-content/themes/canvaabout/img/colorPalette/image4.jpg" />} />
                                <ListItemText>
                                    <ListItemPrimaryText>Title 5</ListItemPrimaryText>
                                    <ListItemSecondaryText>Content</ListItemSecondaryText>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemGraphic icon={<img src="https://www.canva.com/wp-content/themes/canvaabout/img/colorPalette/image4.jpg" />} />
                                <ListItemText>
                                    <ListItemPrimaryText>Title 6</ListItemPrimaryText>
                                    <ListItemSecondaryText>Content</ListItemSecondaryText>
                                </ListItemText>
                            </ListItem>
                        </List>
                     </ListGroup>
                 </div>
                 <h4>List with Radio</h4>
                 <div className="container">
                    <List>
                        <ListItem withRipple>
                            <ListItemGraphic icon="thump_up"/>
                            <ListItemText>
                                Title 1
                            </ListItemText>
                            <ListItemMeta>
                                <Radio name="radio1" id="radio_1" value="12"/>
                            </ListItemMeta>
                        </ListItem>
                        <ListItem withRipple>
                            <ListItemGraphic icon="favorite"/>
                            <ListItemText>
                                Title 2
                            </ListItemText>
                            <ListItemMeta>
                                <Radio name="radio1" id="radio_2" value="13"/>
                            </ListItemMeta>
                        </ListItem>
                        <ListItem disabled>
                            <ListItemGraphic icon="search"/>
                            <ListItemText>
                                Title 3
                            </ListItemText>
                            <ListItemMeta>
                                <Radio name="radio1" id="radio_3" value="14"/>
                            </ListItemMeta>
                        </ListItem>
                    </List>
                 </div>
                 <h4>List with Checkbox</h4>
                 <div className="container">
                    <List >
                        <ListItem key={1}  onClick={() => {console.log('1')}}>
                            <ListItemText>
                                Label 1
                            </ListItemText>
                            <ListItemMeta>
                                <Checkbox id="checkbox1" name="checkbox1" value="1" checked />
                            </ListItemMeta>
                        </ListItem>
                        <ListItem key={2}>
                            <ListItemText>
                                Label 2
                            </ListItemText>
                            <ListItemMeta>
                                <Checkbox id="checkbox2" name="checkbox1" value="2" />
                            </ListItemMeta>
                        </ListItem>
                        <ListItem key={3} disabled>
                            <ListItemText>
                                Label 3
                            </ListItemText>
                            <ListItemMeta>
                                <Checkbox id="checkbox3" name="checkbox1" value="3" />
                            </ListItemMeta>
                        </ListItem>
                    </List>
                 </div>
                 <h2>Typography</h2>
                 <div className="container">
                     <Typography>Default Typography</Typography>
                 </div>
                 <div className="container">
                     <Typography use="headline1">Header 1</Typography>
                 </div>
                 <div className="container">
                     <Typography use="headline2">Header 2</Typography>
                 </div>
                 <div className="container">
                     <Typography use="headline3">Header 3</Typography>
                 </div>
                 <div className="container">
                     <Typography use="headline4">Header 4</Typography>
                 </div>
                 <div className="container">
                     <Typography use="headline5">Header 5</Typography>
                 </div>
                 <div className="container">
                     <Typography use="headline6">Header 6</Typography>
                 </div>
                 <div className="container">
                     <Typography use="subtitle1">Subtitle 1</Typography>
                 </div>
                 <div className="container">
                     <Typography use="subtitle2">Subtitle 2</Typography>
                 </div>
                 <div className="container">
                     <Typography use="body1">Body 1</Typography>
                 </div>
                 <div className="container">
                     <Typography use="body2">Body 2</Typography>
                 </div>
                 <div className="container">
                     <Typography use="button">Button</Typography>
                 </div>
                 <div className="container">
                     <Typography use="caption">Caption</Typography>
                 </div>
                 <div className="container">
                     <Typography use="overline">Overline</Typography>
                 </div>
                 <div className="container">
                     <Typography theme="accent" use="headline3">Header accented</Typography>
                 </div>
                 <div className="container">
                     <Typography weight='light' use="headline3">Header light</Typography>
                 </div>
                 <div className="container">
                     <Typography centered use="headline3">Header centered</Typography>
                 </div>
                 <h2>Chapter</h2>

                 <h4>Default</h4>
                 <div className="container">
                    <Chapter 
                        title="September and part. My One And Only Love (The End)" 
                        index="01"
                        date="7 Jul, 2019"
                        cover="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
                    />
                    <Chapter 
                        title=" and part. My One And Only Love (The End) and part. My One And Only Love (The End) and part. My One And Only Love (The End) and part. My One And Only Love (The End)September and part. My One And Only Love (The End)" 
                        index="02"
                        date="7 Jul, 2019"
                        cover="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
                    />
                    <Chapter 
                        isNew="true"
                        title="September and part. My One And Only Love (The End)" 
                        index="03"
                        date="7 Jul, 2019"
                        cover="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
                    />
                 </div>
                 <h4>New</h4>
                 <div className="container">
                    <Chapter 
                        isNew="true"
                        title="September and part. My One And Only Love (The End)" 
                        index="01"
                        date="7 Jul, 2019"
                        cover="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
                    />
                 </div>
                 <h4>Spoiler</h4>
                 <div className="container">
                     <Spoiler heading="Which Apple PencW hich Apple Pencil will work with my iPad Which Ap ple Pencil will work with my iPadWh ich Apple Pencil will work with my iPa dil will work with my iPad?" body="There are two Apple Pencil models. The original Apple Pencil is compatible with the 12.9‑inch iPad Pro (1st and 2nd generations), 10.5‑inch iPad Pro, 9.7‑inch iPad Pro, and iPad (6th generation). Apple Pencil (2nd generation) is compatible with the 12.9‑inch iPad Pro (3rd generation) and 11‑inch iPad Pro." />
                     <Spoiler heading="Heading" body="Content" defaultOpen />
                         {/* <Spoiler.Heading>Title</Spoiler.Heading> */}
                         {/* <Spoiler.Body>Content</Spoiler.Body> */}
                     {/* </Spoiler> */}
                 </div>

                 <h2>Tabs</h2>
                 <div className="container">
                     <Tab label="Default with Icon" icon="favorite" />
                     <Tab label="Indicator-icon" indicatorIcon="favorite" active />
                     <Tab label="Stacked" icon="search" stacked active/>
                     <Tab label="Active" active/>
                </div>
                 <h2>Tab Bar</h2>
                 <h4>Underline</h4>
                 <div className="container">
                     <TabBar defaultSelected={1} onActivate={(e) => console.log('TabBar onActivate e', e)}>
                         <Tab label="Tab active"/>
                         <Tab label="Tab with Icon" icon="favorite"/>
                         <Tab label="Simple"/>
                         <Tab label="Tab indicatorIcon" indicatorIcon="search"/>
                     </TabBar>
                </div> 
                <h4>Faded</h4>
                 <div className="container">
                     <TabBar defaultSelected={3} fade>
                         <Tab label="Tab active"/>
                         <Tab label="Tab with Icon" icon="favorite"/>
                         <Tab label="Simple"/>
                         <Tab label="Tab indicatorIcon" indicatorIcon="search"/>
                     </TabBar>
                </div> 
                <h4>Simple no default selection(data in props)</h4>
                 <div className="container">
                     <TabBar tabs={[
                         {label: 'Tab active'},
                         {label: 'Tab with Icon', icon: "favorite"},
                         {label: 'Tab simple' },
                         {label: 'Tab with faded indicator', fade: true },
                         {label: 'Tab indicatorIcon', indicatorIcon: "search"},
                     ]}
                     />
                </div> 
                <div className="container">
                    <Comment 
                        name="Jane Rogers"
                        text="hmm.. im questioning about the definition of death in this manga. hahaha. just died and back to ori world or death like SAO? 🤓"
                        likes="2"
                        timestamp="3 days ago"
                        isMine
                    />
                    <Comment 
                        avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
                        name="will_smith"
                        text="hmm.. im questioning about the definition of death in this manga. hahaha. just died and back to ori world or death like SAO? 🤓"
                        likes="0"
                        timestamp="1m"
                    />
                    <Comment 
                        avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
                        name="misterRobot"
                        text="this is a focused comment"
                        likes="2"
                        timestamp="a week ago"
                        highlighted
                        isLiked
                    />
                    <CommentInput />
                </div>
                <div className="container">
                    <VolumeItem 
                        title="Том 1"
                        desc="Product doesn't match the description? Contact us within 30 days after you receive it!"
                    />
                    <ChapterItem 
                        title="Глава 1"
                        desc="Product doesn't match the description? Contact us within 30 days after you receive it!Product doesn't match the description? Contact us within 30 days after you receive it!"
                    />
                    <ChapterItem 
                        title="Глава 2"
                        desc="Product doesn't match the description? Contact us within 30 days after you receive it!Product doesn't match the description? Contact us within 30 days after you receive it!"
                        initialMenuOpen={true}
                    />
                </div>
                {/*
                 <MDCDialg />
                <MDCDrawer />
                <MDCIconButtonToggle />
                <MDCList />
                <MDCMenu />
                <MDCRipple />
                <MDCTextFieldHelperText /> */}
            </div>
        );
    }
}