import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import blankUserPhoto from '../../img/blank-user-photo.png';

import SignInPage from '../SignIn';

import { makeStyles } from '@material-ui/core/styles';
import { AuthUserContext } from '../Session';
import { FirebaseContext } from '../Firebase';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
		position: 'relative',
  },
  accountIcon: {
		width: '100%',
		height: '100%',
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingsDialog({ authUser, firebase }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mobile = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <IconButton edge="end" color="inherit" onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog
        className={classes.dialog}
        fullWidth
        fullScreen={mobile}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appbar}>
				<Toolbar>
					{mobile && (
						<IconButton
							className={classes.menuButton}
							aria-label="close"
							color="inherit"
							edge="start"
							onClick={handleClose}
						>
							<ArrowBackIcon />
						</IconButton>
					)}
					<Typography className={classes.title} variant="h6">Settings</Typography>
					{!mobile && (
						<IconButton
							aria-label="close"
							color="inherit"
							edge="end"
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
      <List>
				<AuthUserContext.Consumer>
					{(authUser) => {
						if (authUser) {
						return (<ListItem>
								<ListItemAvatar>
									<Avatar alt={authUser.displayName} src={authUser.photoURL} />
								</ListItemAvatar>
								<ListItemText primary={authUser.displayName} secondary={authUser.email} />
								<ListItemSecondaryAction>
									<FirebaseContext.Consumer>
										{(firebase) => {
											return (
												<Tooltip title="Sign Out" placement="left">
														<IconButton
															aria-label="sign out"
															color="inherit"
															edge="end"
															onClick={() => firebase.doSignOut()}
														>
															<ExitToAppIcon />
														</IconButton>
												</Tooltip>
											)
										}
									}
									</FirebaseContext.Consumer>
								</ListItemSecondaryAction>
							</ListItem>)
						} else {
						return (<ListItem>
								<ListItemAvatar>
									<Avatar>
										<img className={classes.accountIcon} src={blankUserPhoto} alt="not signed in" />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Sign In" secondary="Using your Google Account" />
								<SignInPage />
							</ListItem>)
							}
						}
					}
				</AuthUserContext.Consumer>
			</List>
      </Dialog>
    </div>
  );
}
