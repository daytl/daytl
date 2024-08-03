import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import {Box, Button, DialogActions, DialogContent, Fab, Grid, Switch, Typography} from '@mui/material';
import {MdCookie as CookieIcon} from "react-icons/md"

const eventList = ["keydown", "mousemove", "wheel", "touchmove", "touchstart", "touchend"];

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [cookieConsent] = useState(Cookies.get('nextjs-gdpr-responded'));
    const shouldShowBannerOnLoad = Cookies.get('nextjs-gdpr-responded') !== 'true';
    const [cookieGa, setCookieGa] = useState(Cookies.get('nextjs-gdpr-google-analytics'));
    const [showSettings, setShowSettings] = useState(false);
    const router = useRouter();

    const triggerScripts = () => {
        setShowBanner(true);
        eventList.forEach(function (event) {
            window.removeEventListener(event, triggerScripts, {passive: true});
        });
    }

    useEffect(() => {
        if (shouldShowBannerOnLoad) {
            eventList.forEach(function (event) {
                window.addEventListener(event, triggerScripts, {passive: true})
            });
            setTimeout(() => {
                triggerScripts();
            }, 5000);
        }
    }, [shouldShowBannerOnLoad]);

    useEffect(() => {
        if (cookieConsent && cookieGa) {
            window.gtag("consent", 'update', {
                'analytics_storage': 'granted'
            });
        }
    }, [cookieConsent, cookieGa])

    const handleAccept = (close = true) => {
        Cookies.set('nextjs-gdpr-google-analytics', true, {expires: 365})
        window.gtag("consent", 'update', {
            'analytics_storage': 'granted'
        });
        if (close) {
            handleCloseAll();
        }
    }

    const handleDecline = (close = true) => {
        Cookies.remove('nextjs-gdpr-google-analytics');
        Cookies.remove('_ga');
        if (close) {
            handleCloseAll();
        }
    }

    const handleCloseAll = () => {
        setShowSettings(false);
        setShowBanner(false);
        Cookies.set('nextjs-gdpr-responded', true, {expires: 365});
    }

    return (
        showBanner ? <Box sx={{
                position: 'fixed',
                width: '100%',
                bottom: '0',
                backgroundColor: 'white',
                padding: '10px',
                border: '1px solid #eee',
                '-webkit-box-shadow': '0px -4px 3px rgba(50, 50, 50, 0.25)',
                '-moz-box-shadow': '0px -4px 3px rgba(50, 50, 50, 0.25)',
                'box-shadow': '0px -4px 3px rgba(50, 50, 50, 0.25)',
            }}
            >
                <DialogContent>
                    <Typography variant="h5" sx={{fontSize: 20}}>Informace o cookies na této stránce</Typography>
                    <Typography variant="body1" sx={{fontSize: '0.9rem'}}>Soubory cookie slouží k sběru a analýze informací
                        o výkonu a používání našeho webu, zajištění správné funkcionality funkcí ze sociálních médií a k
                        optimalizaci obsahu a reklam s cílem jejich zlepšení a přizpůsobení.</Typography>
                </DialogContent>
                {showSettings && <DialogContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Switch disabled checked/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body1" sx={{fontSize: '0.9rem', fontWeight: 'bold'}}>Nezbytné soubory
                                cookie</Typography>
                            <Typography variant="body1" sx={{fontSize: '0.9rem'}}>
                                Aby byla zajištěna základní funkčnost, je nutné používat určité soubory cookie. Bez těchto
                                cookie bude webová stránka nefungovat správně. Výchozí nastavení umožňují jejich použití a
                                nelze je zakázat.
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Switch checked={cookieGa} onChange={(event, value) => {
                                if (value) {
                                    handleAccept(false);
                                } else {
                                    handleDecline(false);
                                }
                            }}/>
                        </Grid>
                        <Grid item xs={8}>

                            <Typography variant="body1" sx={{fontSize: '0.9rem', fontWeight: 'bold'}}>Analytické soubory
                                cookie
                            </Typography>
                            <Typography variant="body1" sx={{fontSize: '0.9rem'}}>
                                Využíváme analytické soubory cookie k posílení našich webových stránek prostřednictvím sběru
                                informací a poskytování zpráv o jejich používání.
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>}
                <DialogActions sx={{padding: '0 16px'}}>
                    <Button size="small" onClick={() => setShowSettings(true)}>Nastavení cookies</Button>
                    <Button size="small" onClick={handleDecline} variant="outlined">Odmítnout všechny</Button>
                    <Button size="small" onClick={handleAccept} color="primary" variant="contained">Přijmout
                        všechny</Button>
                </DialogActions>
            </Box> :
            <Fab color="secondary"
                 variant="outlined"
                 size="small"
                 sx={{
                     position: 'fixed',
                     fontSize: '1.5rem',
                     bottom: '20px',
                     left: '20px',

                 }} onClick={() => {
                setShowBanner(true);
                setCookieGa(Cookies.get('nextjs-gdpr-google-analytics'));
            }}
                 title="Nastavení cookies"
            >
                <CookieIcon sx={{fontsize: 24}}/>
            </Fab>
    )
}

export default CookieBanner