import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AuthUserContext } from '../Session';
import ReactMarkdown from 'react-markdown';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const DEFAULT_RECIPE_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAekAAAGaCAIAAACkGiyvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODA4MzgzRjc0QURGRjc5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQUQzNTQzMTU0ODIxMUUzOTUyRDlEMDJEQTAwNDRBQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQUQzNTQzMDU0ODIxMUUzOTUyRDlEMDJEQTAwNDRBQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxZmZhNmI1MS01MWRmLTQ3YTgtYjk1OS0xN2YxNWI0ZWYxNDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgwODM4M0Y3NEFERkY3OTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4n3ZyCAAAkMElEQVR42uyd+XfjxploVdgIrtrVrd7bS9r2JLaTzBnPOe+/f7+9895L4sSTzCTtJWN3qzeptXEFAUxR7UWiKBJLoVAE7z197F5EEix8dfHhQy1i0D9ZAwCApcKiCQAAcDcAAOBuAADA3QAAuBsAAHA3AADgbgAA3A0AALgbAABwNwAA7gYAANwNAAC4GwAAdwMAAO4GAADcDQAAuBsAAHcDAADuBgAA3A0AgLsBAAB3AwAA7gYAwN0AAIC7AQAAdwMA4G4AAMDdAACAuwEAAHcDAOBuAADA3QAAgLsBAHA3AADgbgAAwN0AALgbAABwNwAA4G4AANwNAAC4GwAAcDcAAO4GAADcDQAAuBsAAHA3AADuBgAA3A0AALgbAAB3AwAA7gYAANwNAIC7AQAAdwMAAO4GAMDdAACAuwEAAHcDAADuBgDA3QAAgLsBAAB3AwDgbgAAwN0AAIC7AQBwNwAA4G4AAMDdAAC4GwAAcDcAAOBuAADcDQAAuBsAAHA3AADgbgAA3A0AALgbAABwNwAA7gYAANwNAAC4GwAAdwMAAO4GAADcDQCAuwEAAHcDAADuBgAA3A0AgLsBAAB3AwAA7gYAqAwOTQBLRBxHUdCPxn3533g8jMMgjoJI/vfiN3EUrsXR5Mei8eVXCct59z9h2cJyhe1atvvuN8KpWW7dcuqW6wth08KAuwHyEo2H0eg8HJ6Ho7Nw1J34OhxlMf5PKo9D+Z/+TT8mbE963Paatte2ay3La1lOjbMAZiIG/RNaAUxJq6Ng3D8JB8fjwXE4OJN/LLl7WK7ttx1/w/Y3nPq6/CPnCHA3wLtcOAh6h+PeoVS2TK5NPtRJSi4l3th2G9vCxuOAu2H1jD3uH0tfB7034eB0Gb+A7Xfcxo70uFPfkP2IMwq4Gyps7DjoHwZnL4PuK5luV6QL2a7b3HPbt9z69ppA4oC7oUpZdu9odPYiOH9Vegm7wL5kuW5rz2vfdhpbZOKAu2GJiYL+6PTZ6PR5NB6szre2HN/r3PE6dy23TgwA7oYlyrPj0fnL0ekPMt1e5WaQCbjXuee1blFLAdwNZks7CkYnPwyPv1+pRHthGl7buO+t32OIIeBuMI4o6A3f/nN0+jy+mAAD0z1N2F7nTm3zoeU2aA3A3WCEtQdH34xOD2TaTWss7HFeZ9/feg+DA+4GrI3BAXcDJLH2eDg4fDo6fY618xn8jr/9AaumAO6GwomjcHj83fDoO+raanqgsGtbj2obj4TFKoaAu6EYRqfPZLotk26aQi0y9ZYJuNe5S1MA7gaVhKPz/su/jgfHNEVxOP5Gfe8Tu9aiKQB3Q17iOBwcfjM8/k7+jtYovkeK2sYjf/s9NoIA3A3ZGfcOe6/+GgV9mkInlltv7H3iNLZpCsDdkD7dfv334cn3NEVZ1Nbv+7u/IgEH3A1JCQcn3Rd/iYIeTVF2At5o3v6N7a/TFIC7YUHCPTj8enD0LQO3zemk/tZjf/t91pUF3A2zicJh7+DP4/5bmsI0nPpmY/9Ty2YWD+BuuIpUdvfgy2wbsYOOvmp7zf1PnfoWTQG4G35k8PbbwZun1EnM77D+9gf+1mMaAnD3qhPHYe/FV8H5y+rEtLDs+obttS3Hl7+No3E0Hoz7x+HwtBpf0G3datz+NeNPcDfuXl2i8bB78Mcl3al9htSaO976faexLfV9/V/DUXdw+LQaVynb7zT3f8siVrgbVpFweNZ9/sdqbHDj1Dfru0/sWmfhTw6P/7v/+j8r8JXlXUXzzm/tWptIxt2wQgTd170Xf46jCqwFKOo7H9Y2HyV/gXS3NHgVeq9lN25/6jZ3iecVxKIJVpDR2UH34E8VELcQVvPO56nELfG3P6hGsVieQXke5dkkpHE3VJ/h8fe9F3+pxMJSorH/WYasU1iO09ypyOmMY3k25TklsHE3VJnB0Tf913+rxnep73yYuVxQsXVW5TmVZ5bwxt1QTfpv/jE4fFqN7+I0ttKWSqZS76pdlQ+fyvNLkONuqF7G/fXw7bcV+TJC1Hc/5pxOIc+vPMu0A+6GColb9urD6vRqr3PX9pp53iGOxtU80YdfDypzhQbcTTo2qNTdtPC33sv7HtXdA0ie6yH6xt2w7IxOn1WsDOq29izHz6vuiubd75BnXJ53gh93w7ISdN/0Xv61Yl/KW1exmXrV996U512efboA7oblIxyc9g6+rNjSgMJ23bqCXRzjOKz6+Y/l2a/MSjWAu1eFKOifP/9D9Qw1GdAtFGwfE8dR5WNAnn0ZA+wTjbtheTptNO4+/2Mld1FwG4rmQ0bRSkRCOJpEQqWL+7gbqkPv5Vfh6LySX82ub6rKSVckGGQkyHigU+BuMJ3B0dfB+atqBqtbV7ZidRytTkjIeGDODu4Gs3tp93WV5uBM4fgbyooJK1ZGkFEhY4MOgrvBRKKgP1kgsLqwz0AeZGzw3BJ3g3nEcXeyl0KV00lL3eJ/cVhGQwnL9pryCmS59RICJBrLCKn8wPbVwaEJqnJT/DQcVHwLJNtTuHCrvnq3sF2vc89r7dl+R/7pJ5OG4/5RcHYwOnupbQy+jJD+4dP6zof0F9wNRjDuHVZ+BSKZs+afCn8pCdUxzkTYnr/1nrd+9/o2PfLruM1d+cvfGQyPvh2e/KDH4MO337qNLaexTa9Z+ttQmmDZicOg96L6g8AU1xmKH2fide50Hv6v2saD+furyQtSfe/j9oMvtFXzZbTImKHj4G4omf6b/4rCYfUj1WmoVHeR7pY5dXP/88atXwvbTfgSu9Zp3//32sZDDS0po0XGDB0Hd0OZBN3Xo9PnKxGp6vLuQifmyONs3f/Cbe2lV76o7z5p3P61dH/RjSljhiGDuBtKI47G/Vdqlgl0W7fknfvsMqiw/M3HUiuWU5+VDtflP/lbj8Us4zj1Lfm2buu2iry7pq7hiqos216rff+LPM9Uvfad1p3fadiSTUYOc+VxN5RD/83fo7GCaol0a3P/s9r6fWmN695p7H7s73wob+db935/bR0o0br7e/lP/vaH0tHTseU1Jv+6fr+5/6nXzqtvoc7dBTlLNl3r3r8K28v5Pk5jqyn1XXD2LSNHxg+dCHeDbsaDk9FkcIICaj+viC2E05xa7Em4nds/VQMaTm39iq38jhT0jxeA9v7PA+B+/Jvm3s+u9zr38kZqbicWmndbjt+893uh6CCd+kZj//Op9lRfOTn5YVz1caW4G4yrl/Rf/U1ZEFwqJU8NihC2c/lvptx02acyT5x6NHf5hfmr1Sbn3cJymnd/Z9k1he/pNnfqex8VXzn5W8VWeMfdYDSjk2fhUNmy+sK6cTiETMTnv/QmWU//XOIRFzfn3QrNqNhWjf1Plc4b+vl+6H5t436hgSSjSMYSHQp3g5aUOwr6h09Vpo22c7PWrTTvY8/JTHMfpKuuAVXm3bXNR8pWFb9GfedJ0eO+ZSzJiKJb4W4onMHhNwr3VbiwqpjzzwktvzCc5mT3yQ5S4dVPWd5t++v17SKnmAurefszYdkFpgLhSEYU3Qp3Q7FE48Hw5HulcnCy/+tVlU8pZmoY9SLv63O3sgnxUqy3fqNkD7Z5XdRr+Nu/KvQjZETJuKJz4W4oNOn+Wu187qlaxPSEwzQj1abTw6tvZU7erWpujr/1+OdhNoVS27gnE/wCPyCOKrzsO+4GA5LuUVf5LMppLU4ly8JO9V7Jk/SUcaq0aKCiZmJ7TX/zsa4zLxp7nxQ6ZFDGlYwuuhjuhkK4eESpeIzE/HR4KpWer/JF5Rdj8m4Vzyr9nScaJq//cqmotb2fh+EXk3urfQAOuBt+JBydB+cv1Wd089PhKT2JuYMC5+fdOfybLv1P4Kmcr3fqG25zR3MA+FvvFzrZUkZXVbeoxt1QJsO33xVyN54m777u1Kt/ml8zcQ1pyfyb5vjbJWxfYDk1b+PBMsYY4O7VJRoPRmcHhbjbdrK7e25mPVWayFX3UDyWI1fe7TS2nfpmKWHgbz5WfQtyBRljDDjB3aA0ITr+Z0Gr303l3dfGz01FiJj/XgXl3WoHOOesd+tZZfumNvQ6d4q8JYknkQa4GxS5JlC17NTCZHkqJ702gtuZkw7PN6yGdU2TGyp7h/Ea+ivdlym6bCIjjWmWuBtUdadnxe2vuCAdnp9KX13tZNEoFGPq3TnGd5eYdL/D9pqFXjxkpI1OntPpcDcoYHj6Q3FvvmBgnyHjuxXrKcrcWN5kqduSKbZsMom37+l0uBvyMu4fRaNege62c4wzmX8ZuFqaMCfvzjwxVSa8JlR+nOZeoYch401GHV0Pd0O+JOi42CTomnDnpdILVH510cGpOo9BeXec8VmlCUn3xc2QlWU/TJOiDnB3xYnDUdB9VbC7p8aZjOfJeu7Dyfnjuy2D8u44U0PZbnPXkG+gZAvQOcioU7hWJeDulWN09qK4jXHf6XbB4BCRZm6OtWCKphBGxFu2MYJOfWtNmNJfnMZWsY0Zx5PYA9wNWd19UOj7Ly6bphLEoh82Zmpllsuh09g2JzAml9yC5wcVHXuAuytLFPTDgreCXfj88JrcRfYkPccQ7/yz2K++W5YxguUO655xPI1ij0fGnoxAuiHuhgyJT+E3rYsT4elnlc6c+Jm/98JarqEmagtHqceZWI5vuQ2jwsNpbFUgAgF3V5Cg+JvWGYnw9IYJ86fbzF1H8NpQvMxDTdTuMJlhopNd65gWHpPdjQuuvweUTXA3pM4Mg56GBTmvJ8LTG5XlGd+d4ONKybvj9OO7bb9tXIgIYddahX6CjEAZh3RG3A1pUp7uGx3df0EiLFLv1VLM1ErFSwJkcLd5ebeeo9ITh4C7q+Tu1zrcnXLx7oVp+IIlvDPn3eoGSma7DNi1toFBYnvtasQh4O6KIP0y7r8tPe+eZeoFA7rz7DqvK+9OfxmQVySnZmLvdetFf4SMw+LWQQPcXTUmq0ko3Qw+o0wzPAq79JLrDxgzj+/OPIt91mUg9VtZjl/oPr853O1ryCNY2wR3Q2J39zQVGa25zyozpMkFLeGtcpxJ+vLLhbuN7L1aDkxbNALurkDefazng2YkwpfVdj3vXjhz0ipmCW95VIpuRLLm3SYir4VqdxQqNxoBdy83Ui7h8Exb55/3r9dMLa6uFDi1cODCiMozJ15Z1TXDY8/i/VjQGVSCjEa14+sBd5N05+/5bh4vzJJ7Ic8q19SVTTKUzoUwuJtoOTZSb9wNCdIcLSNMfkqEFT+rvJqYx0rzblXujtJ/KdfYaNGzF4TOmATcvbR598CcvNvO8I6/WDIMlebdijbAzbDhmRDGRku6TemWISYBdy9t3q2t2C27/TUrXV6x77oXrrlepLVzjqUE1bg7y0bDhS6hrv02wuSYBNy9rERBX9tzocUz1BePKnFSvyTzEG9F7s4k4sjgkNFxXZExyXqwuBvmJjgjfQlO+sW7FdzCZ867I0U1kwyXRpMnFmq70uuMTMDdS+hujTeni/NuK8OzykXuLj3vzpCoGlwz0XZslE1wN8zvIefaPmtx3p1+bs6VH5hVis08ZkNZvTvMkHcHxgaMtmPTGZmAu5ePaNTV6O6ZeXc05wembD7rYaZzKSMME39oEueq2rY8daIajQ3dMV22sLZ6ThR06Z64G+ZoQt8ToZnliysuWJxli8WpeoIP1ZlgZigQR+HQUHcH+g6MZ5W4G+alljofiyWYNplrfHe2D725cUobZxKPDXW3zouKjEx1tz6AuyuWdOtNbRKMM7nm7kWTVBY+/8xc747KG98tU3Uzh5pEei8qpN64G2YTanZ3+vHd0+a9PuFwcc0k8zKwqmomWSxsZrVX59MR/fEJuHtpiMem5d2pJ0leLrPc8Kwy+zKwasYyZxpUZ+YoCw27UZcYn4C7l4Yo1DoWbWYKfEW4It/47lmWzJx3rykaapJtCx7NljTzqDTHJ+Du5cm79T4Lmp0CXxKuyLfnWbZkf647VLRPprw7MtDdcRSNehWOT8DdS+Tu8vPu+T8gcg8jyZV3q3g0l63wMh6cmBYt48lEx7jC8Qm4m7w7cwq8YF7l9YEooqJ5t9SWaWUT/VsAk3fjbrjJTXrz7sWPIheO704/zkT+QNatXhTl3RlH+40N239A/34I1LtxN9yY2JiTdGfexPbKtPhZBQor+xBvJXlfxgVdDds7Ji5hH7I4pI/iblCZEmYx7MxBJldUayXNtdOm3pmHeJeadwe9I8315bk3ASf69/81eS1c3A2rwsyCyeWddCynNjtibO8nBc9Ony+9UMwuf2dewlvNGMGMeXccjswpmwTdl8Qw7gZz8m6NmdRMqwpR69z78TebD2e+ztt48O43tY3ZPzD5+4sLQG393sxPEaXWu9dybBIWnL8yxd1lHIn+TB/m4NAEK3ulmPm39b2Pa1uPhHBuSqv9rcde586cxFz+q9vclf3ccus3pb5l5d057/qlMeu7H5V+5sLhKUuLAHn3qnLzdumWU5+/Uqu09k3i/jGztt0bxZ11ZuM79eZe1SRXwToaD8a9w9JP3ej0OfELuHtV1V3emtRRjlWnc26DkH9Bq+HJDyXfLsUh7gbcvbrEYVDKsIGL9VSzCzRvyTv37o5B91W5WzEEZy+pOwPuXmlK2T02HJ6WeLug4HIVx6PjMlPv4fF/E7qAu80i83SYrBotYY2OcT/Xh+bOu6P8X2F4/M+yMt+g9ybnxW+J4hNw9xLJW2vfGHdLeOw27r3JlXePB/mSZgVlIinu4dt/lhIgg8OvVyc+AXeTd9+UAh9pzh+jcJhzJnfuZ5WRki9SSuodnL8KS13OMPNeo4C7K+9uV+fHxXE0Oj3Qap/Jx+V6WhiHg3zfWY27pbgHh0/X9J6t/uE/Viq3ANy9PO62Xc2fKPPH/EMvkgsv/3O2nLvrxupWUxoef6/zYe/w+DvNu1POik+PToq7YdbJ0O7uKOiNzjQNFh6e/JCzWp3f3UovVHHv5X/oufLJ01Rypbuk+ATcvSx5dwl5Tf/N3zWsqS+dq6bIEEd5dm9RW6QOh6eDo+KVGsfdF3+JFVV7yLtxNxTQN+ZONC/KDGEwyR8L/pDey69UeTPXEG/VafLg6Nui96/pH/4jNGPHNWHX6KS4G2adDMcv5XOD7mvpoOLeX97vK1wGJM8Q7wIGh8Tdgz/nrwXdxOjsxfDtd6bEp+vTSXE3GOTuC73+IzgvZEno0dnB4OgbhW+Yr+StvvIQh6Pusz8UsQ/veHDcf/kV8Qm42/iTUWpe03vxl3FP8e2/zOh7qu0T5cq7C1nCJRydd5//MVa6JVg4fPeekUHxibtxN9zYN0RpZ0RqQspCYWlVXgl6B18qLzHnGeJdnApljtx9pkzfUtznz/5vbNTevkJQM8HdcGP/mLPstRZ9h+fP/r8SfUtxd5//oQhX5ppaWWQaO+4fXeg770eYKO61NdttLt6qFHD3ymK7jXIPII7GE33nW/BoYrFixL2W91llscveyi/eO/hznrmjUdAzUNwTU3gNuifuhpvdXWuVfgxS3zJ/jMYZd9UKh2fd538qrjph1BjB6wTdV71Xf814dOHo/If/Z6C4f8q7AXfDjdlN24TDkH6U/s1guon3D/5U6DpNkVljBGcwOnk2OnuR4YW9F18VN9wwb2TW2nRP3A1G590/p8+T1U5SMjj8uvBtcHPtWqlp8Zb+6/9MW58Jzl8F+RbILTgycTfuhjk9xGsKY1ZJHhx9m0pAMiMennyv47Yg6+NKbQu3xuFolLIp1I6CV4sQlk29G3fD/G5i+6YkODK9Dc5SLBI7On22pmU8cpy55K1t0cS1taFsjRR3OaclboizOKXwOwwywd2w8OZ03ZyDSVW3Dc5f6DmqzE/zdG6vHI26yReJDc5fGR2T/gYdE3fDApy6Qf1kPHibsM4QjYfh8Nxwd6/pnaaYfBUXkyvdk5j01+mYuBsW5TgmuXsyXSfZVJ1w8FZfSpv1WaXaaeuL3Z1sg7dY3g4MzohJwN1LfkrsmuUa9FxonMzd44G+cm32moled4fDRE0XTUorsbkB6TUtVn/F3ZDoFrWxZc7BhKNElZBodK7tkLK6O9b5rHLtoo6UpOIUlr2Z2YJorG/SJXE3JMJtbJtzMAm3SdQpoGzju6NgYGbrRWa72zUpkwDcbX7ebcqQrCjoJdKpxgmB4fA87Uhtmar335Swz3qYYKZS5uUHtCAckzIJ+MUSNIGJ3cVyHX99PDg24WDiKJR5rjykufYZ6SxHyMvJ6bf/WzrF33ovyXy/cHR+/v3/0TlA8JfWS3BJM3Ye/EQQ9fX5px7Iu+Fqn2ntmnMwC5cQibXbR+bdwfnL7sGXSX543H1TirjXkq2+kmtV28JvAXfpjLgbUuA2DeozCzeS1zbX/HoCnuj4y9t9Jslj1RzLsxQfhy3cjbshDbbXsjxTVt1cKKCopGVLRbJthoRV2hIxSbxs5qKvaxejA2Uc0hlxN6TDa91aFneXlTkKO1kptsSd5BY33ZgIBNxdKdzWbVPcvXBKS0nVZGF7ydJz29im0zxdKGUE4m7cDemxay3bjLLJwnpxbLi7y6uZLB5+E0Xmhh9rduNuyHjT2rlrxHGY6hfL/JpJFC5r7LXv0AFxN2S9aW3vs27ycufdi/NyM+Uu3PZtAgx3Q9bT49Tc5lLMaitnKSXz691Lemxuc8dyfDog7oYct67r95YiAy4nfJO5e81gdxN1gLuridvcJQO60clOorVJhV2eu8Xylbwmd3uNHaILd0Pe3l9+ErToWZ+wygkkK2m92y2v5RZdNsyTu7f+YBkvObgbjKO2fk+IMs/UYjWXdHgi2R2Jyc8qhWXWenAy0moUTHA3qOlOtud29k3Ou8tyd9J6tzRSSSXvhZeNcq/K13Hb+0lnqwLuhsWp98ajUtVt5/yBgi5pyW/ty0pvhXAWHplZkbb5iO6Gu0EZttcscYLywnpxKWa0nDSbKJZVNknQMubkuTLGbGNWQAPcXRH8rce4O7O7S8u7E1wzzNncwN98TEfD3aA69a51yhq5JWzHQDOKNEMnF36Fwty9NHm329y1/Q4dDXdDAWnRzoem5t0l2CfVsPeyctskMz8tM9ztb39AF8PdUFDq3XZbe2UIaJG7k473KM/dJfkxiZdNqJm4zT1WDcTdUGhy9KHuCejCEovn5tj6x0tYbqq8u6SaSRJ3l593i7Ju6QB3r0zq7TU1T51IaD39N/6VqZmUctdyGRlRDC/B3aAh9X5f53hqK+maIboFZC3Fs0rjayYylmRE0a1wN+hI5fwtfZ3NTHdfTMxJEb2WVVa9u5bgZ8p0t4yl0hN/wN2rQm3jgbZd5IWdyN3pZsroTbrXyqopCytR3u2Wtk6kjKLaxkM6FO4GfVJo7H5kWN6t190pfVfO7KGElz29TXeZSRSxZCDuBp04jW2vrWOBqoRrZJN3zzpIz8Cm+xkZPzKK6Eq4G3RT332iQUlJk0dHa800tbvLqHcnnfk5Ka3orjjLyJHxQyfC3VACssPXdwrvfkn3pnHqJmrxFz2WsuKKn/gndafeMnJ4RIm7oTS8zh23WexMSytpzUTrA7fUHyeE/oVqkxflNbvbbe7KyKH74G4ok/qtjwusnEjjOYlrJhqfelnpx2boL5skv8AIjVe+SbXk1id0HNwNZZ9Cu9bYK6orXtgnoZGFztQ7w9gM/Y8rLbeeuJ315d0yWkoc2QK4Gy7dArduFbQfcSoda3P3RD3pc3z9Je809W5NTwtknJS4iQfgbpimvvukiCUpUjlFm4CyTWbRnHeLNKNHLC3Tc2yvVdc1LQBwNyQ0hd3Y/0z5jrqpnGLpmh+YrcKgud4tXLMuexcR8qlpWxsD7oaLrEr1M6iUebc2d2fLu7XWTNKXm4p90itjQ0YI3QR3g4l47f3axoOy8m5B3p35LkQU+6RXRoWeWbiAuyFrerXzxKlvqROQkfXubHm3pTnvrqds6qLc7dQ3NczhAtwNOcUmmvufKdJoumQwlei1lSN++TK25rw7pbuLufLJw2juf86CU7gblsHettu8+7v8aeakNJHm0Za879czTnlJaiaN0vNuGQPNO781ZB96wN2wGNtr5s+2MuTResomYhmeVdpp8+6Urk92B/Y5zydxNywZTmOrsfcvOjPHNS1lE5lFZhvopjPvFpaddqUn5U3XuPVrGQN0BNwNy4fXuZNnnc8seXfx7s48HkNn3l1609V3fsXAEtwNS0xt46G/9bhK7s68cqkQGt3tpL9lSfl0YQ7+1nu1zUcEP+6G5cbf/jDboO9M7m4UHrJZn7zpXAM20zVMKHlcWdu4729/QNjjbqgC9d2Pauv3077KNrTenX3HAG1DvLO1g537yifPcn33YwIed0OF9L33cSp9i0wbcV3c+Bc7lLjC7s555ZuIew9x426opL43Hib2SLYcUBQ9TDDXaGVdZZNsrZehSv6LuDceIm7cDdXV9+4Tf+v9QnPAossmecrW2lbR05x3y3PKxsG4GyqOv/1+kkWczXV3nuEiWqaGW04t20UiW9NNrsfb7xPYq4ZDE6wgtY0HwvZ6L79aiyPlCraLHmqSI3dWvr55yZc9YTVv/4Z9cMi7YYXw2rdbd38/Z6ph5rJ18TUT04M2c9laWE7yyZ/yJ+UZRNy4G1bvnqu+2b7/b5bXKDl5rF6nytECCV9rec32gy/kGSSMcTes5OmXCrj/hdPYVuluB3cX626nsTW56BY/DQpwN5jLxa3376amUE/We8o6FDrPa6vi7kaO1y5wtzxT84tdgLthhQRe3/lVc/+zn52bM6crtGwSR2GO146XN+8Wli3PkTxTRe9sCUsB40zgR9zWrXat3T34Mhye5ax7WI4v36Qwecem38k4Xp6mm/n3dq3T3P+UOgngbph9s9++/0X/zd9zjqXTtmG8iW042dNHqG262saDSbotuEsG3A03Z4313Y/iOMz1HsW6O3venafeksbdyi578t3qe//iNncITMDdkEC+OfNut8BdK3P5t/h6i8hXbnq3K1B8MWfKbd1q7H3CbpOAu0FX3cAuMu++eS5oAqLCv3vu3ZaFW18Lg8bex8y7AdwNet3tFJp3Zx8rEoeB+d/d33jotm8xChBwN+hGFDtGMMj8yjjWkHfnvefw1u8RQrA40mgCUO9uYRU3PSdz3q1ncLco8p4DAHdDwQrLsbvNAgWHZrubR4uAu2GZ3V2UwrLn3cUXu9cu1hjg7APuhqV198rWTCyeIQHuhuV1d2G7HETh0Oy82+bsA+6G5Y2sokIrDjK6OxoPNKibMw+4G5Y67y7M3XGYrfoRjYeFf2uSbsDdsNS4rVt2rVPQm2ezsIa8W8N6KQDv4LkKFOPu5q78FQ5PRyfPRmcHap8TxtLCXtNAd+dZJwsAd4MpyNS7vtep7z4Juq+lwYPumzUVMxuz5d1xwe4WwnKau5x0wN1QFSb7qt2Sv2T2LSUenL8ad1/nmZ4eBb305pYfPipO2ZMv2Nyl3g24GyrpcMdr78tfcRyOe0fj7huZiUfjftr3CUfd1C8JumoLGpZTd5s7jvzV2BbsigC4G1ZC4sJ+VxCvyyR61A36RxOV948SDsGO0rs7w0tmHLbtOY0tp77p1res9AV3ANwN1UFKsCZ/rd9/Z9jx4CQcnEz+Ozq/qTg+SaLjWF4BUuTdw/Nsdwp2re3UOra/7vjr+BpwN8Bsj3vSj507kz/EcTjqhqNTqd1o1IuCbhj0ftz4ZlK87qfaeHdyJUhgasvxba9l15qW/O/Fr1RXCADcDSuPEHZNarS11v7pb6Syo9FaFMZRmHadwknNZLIyrS2EI2z5y7VsT36AcDyZWltuffIr3zbBAFr7x6B/QisAACzZTSpNAACAuwEAAHcDAADuBgDA3QAAgLsBAAB3AwDgbgAAwN0AAIC7AQBwNwAA4G4AAMDdAAC4GwAAcDcAAOBuAADA3QAAuBsAAHA3AADgbgAA3A0AALgbAABwNwAA7gYAANwNAAC4GwAAdwMAAO4GAADcDQAAuBsAAHcDAADuBgAA3A0AgLsBAAB3AwAA7gYAwN0AAIC7AQAAdwMA4G4AAMDdAACAuwEAcDcAAOBuAADA3QAAgLsBAHA3AADgbgAAwN0AALgbAABwNwAA4G4AANwNAAC4GwAAcDcAAO4GAADcDQAAuBsAAHA3AADuBgAA3A0AALgbAAB3AwAA7gYAANwNAIC7AQAAdwMAAO4GAMDdAACAuwEAAHcDAOBuAADA3QAAgLsBAAB3AwDgbgAAwN0AAIC7AQBwNwAA4G4AAMDdAAC4GwAAcDcAAOBuAADcDQAAuBsAAHA3AADgbgAA3A0AALgbAABwNwAA7gYAANwNAAC4GwAAdwMAAO4GAADcDQCAuwEAwGj+R4ABAK1y4qe37lOHAAAAAElFTkSuQmCC'

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
		position: 'relative',
  },
  cover: {
    width: '100%',
    height: '20vh',
    background: `#e2e2e2 no-repeat center center`,
    'background-size': 'cover'
  },
  file: {
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    'z-index': '-1',
  },
  flex : {
    display: 'flex',
  },
  ninety : {
    width: '90%',
    minHeight: '110px'
  },
  formControl : {
    minWidth: 120
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddFAB = ({ onCreateRecipe }) => {

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [image, setImage] = React.useState(DEFAULT_RECIPE_IMAGE);
  const [ingredients, setIngredients] = React.useState(['']);
  const [cookingTime, setCookingTime] = React.useState('');
  const [type, setType] = React.useState('');
  const [recipeText, setRecipeText] = React.useState('');
  const [previewMode, setPreviewMode] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (force = false) => {
    if (!force && (title !== '' || image !== '' || recipeText !== '' || ingredients.filter(Boolean).length)) {
      if (window.confirm('Are you sure you want to cancel adding this new recipe? All progress will be lost')) {
        setOpen(false);
        setPreviewMode(false);
        setTitle('');
        setImage(DEFAULT_RECIPE_IMAGE);
        setIngredients(['']);
        setCookingTime('');
        setType('');
        setRecipeText('');
      }
    } else {
      setOpen(false);
      setPreviewMode(false);
      setTitle('');
      setImage(DEFAULT_RECIPE_IMAGE);
      setIngredients(['']);
      setCookingTime('');
      setType('');
      setRecipeText('');
    }
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  }

  const onChangeText = (event, field, i) => {
    const value = event.target.value;

    if (field === 'title') {
      setTitle(value);
    } else if (field === 'recipeText') {
      setRecipeText(value);
    } else if (field === 'cookingTime') {
        setCookingTime(value);
    } else if (field === 'ingredients') {
      const ingreds = [...ingredients];
      ingreds[i] = value;
      setIngredients(ingreds)
    }
  };

  const onChangeSpinner = (event) => {
    const value = event.target.value;

    setType(value);
  };

  const onChangeFile = (files) => {
    let b64 = '';
    const reader = new FileReader();

    reader.onloadend = function() {
      b64 = reader.result;
      setImage(b64);
    }

    if (files[0].size > 10485760 ) {
      alert('file too large! 10MB Maximum');
    } else {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSave = (e, authUser) => {
    const filteredIngreds = ingredients.filter(Boolean); //Remove empty elements

    if (!title || !filteredIngreds.length || !recipeText) {
      let err = '';
      if (!title) err += "\nrecipe title";
      if (!filteredIngreds.length) err += "\nrecipe ingredients";
      if (!recipeText) err += "\nrecipe text";
      alert(`Please fill in all the boxes! You missed out: ${err}.`)
    } else {
      onCreateRecipe(e, authUser, title, image, cookingTime, type, filteredIngreds, recipeText)
      setTitle('');
      setIngredients(['']);
      setRecipeText('');
      setType('');
      handleClose(true);
    }
  }

  const addIngredient = () => {
    const ingreds = [...ingredients];
    ingreds.push('');
    setIngredients(ingreds);
  }

  const mobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  return (
    <AuthUserContext.Consumer>
        {authUser => (
          <>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            <Dialog
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
                    <Typography className={classes.title} variant="h6">Add Recipe</Typography>
                    <IconButton
                      aria-label="save"
                      color="inherit"
                      onClick={e => handleSave(e, authUser)}
                    >
                      <SaveIcon />
                    </IconButton>
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
                <div>
                  <div className={classes.cover} style ={ { backgroundImage: "url("+image+")" } } alt="Recipe">
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      id="file"
                      className={classes.file}
                      onChange={event => onChangeFile(event.target.files)}
                    />
                    <label htmlFor="file" className="filePickerLabel"><CloudUploadIcon /> Add Recipe Image...</label>
                  </div>
                  <Container>
                    <Typography className={classes.title} variant="h4">
                      <Input
                        type="text"
                        placeholder="Recipe Name..."
                        value={title}
                        onChange={event => onChangeText(event, 'title')}
                      />
                    </Typography>
                    <Typography variant="h4">
                      <Input
                        type="text"
                        placeholder="Cooking Time..."
                        value={cookingTime}
                        onChange={event => onChangeText(event, 'cookingTime')}
                      />
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="type-label">Meal Type:</InputLabel>
                      <Select
                        value={type}
                        onChange={onChangeSpinner}
                        labelId="type-label"
                        id="type"
                      >
                        <MenuItem value="brek">Breakfast</MenuItem>
                        <MenuItem value="lAndD">Lunch & Dinner</MenuItem>
                        <MenuItem value="snack">Snack</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography className={classes.title} variant="h6">Ingredients:</Typography>
                    <ul>
                    {ingredients.map((e,i) => (
                      <li key={i}>
                        <input
                          key={i}
                          type="text"
                          id={`ingredientBox-${i}`}
                          value={ingredients[i] || ''}
                          placeholder="Ingredients"
                          onChange={event => onChangeText(event, 'ingredients', i)}
                        />
                        <>
                          {(i === ingredients.length - 1) ? (
                            <Button onClick={addIngredient}>
                              Add
                            </Button>
                          ) : ''}
                        </>
                      </li>
                    ))}
                    </ul>
                    <div className={classes.flex}>
                      {previewMode ? (
                        <ReactMarkdown source={recipeText} className={classes.ninety} />
                      ) : (
                        <TextField
                          type="text"
                          multiline={true}
                          rows={5}
                          value={recipeText}
                          onChange={event => onChangeText(event, 'recipeText')}
                          className={classes.ninety}
                        />
                      )}
                      <Button onClick={togglePreviewMode}>Preview</Button>
                    </div>
                  </Container>
                </div>
              </Dialog>
          </>
        )}
    </AuthUserContext.Consumer>
  );
}

export default AddFAB;
