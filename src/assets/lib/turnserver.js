Last login: Mon Aug 15 20:09:58 on ttys003
/Users/adfcait/.zshrc:4: command not found: ‘export
/Users/adfcait/.zshrc:5: command not found: ‘export
/Users/adfcait/.zshrc:6: parse error near `then'
adfcait@MacBook-Pro ~ % ssh au_adfca@10.93.1.98 

                                    WARNING

           This system is  property of Etisalat, and it must  be used
               in accordance with applicable Etisalat Policies.
      Unauthorized access or activity is a violation of Etisalat Policies
                         and may be a violation of law.


      Unauthorized use may result in penalties including, but not limited to,
            reprimand, dismissal, financial penalties, and legal action.


au_adfca@10.93.1.98's password: 
Permission denied, please try again.
au_adfca@10.93.1.98's password: 
Last failed login: Mon Aug 15 20:12:28 +04 2022 from 192.168.200.32 on ssh:notty
There was 1 failed login attempt since the last successful login.
Last login: Mon Aug 15 20:10:13 2022 from 192.168.200.32
-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory
manpath: can't set the locale; make sure $LC_* and $LANG are correct
[au_adfca@ADFCASRV01 ~]$ cd webrtc_uae
[au_adfca@ADFCASRV01 webrtc_uae]$ tcpdump -i any -s 00 -w test123.pcap
tcpdump: any: You don't have permission to capture on that device
(socket: Operation not permitted)
[au_adfca@ADFCASRV01 webrtc_uae]$ sudo tcpdump -i any -s 00 -w test123.pcap
tcpdump: listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
^C52 packets captured
53 packets received by filter
0 packets dropped by kernel
[au_adfca@ADFCASRV01 webrtc_uae]$ sudo tcpdump -i any -s 00 -w test123.pcap
tcpdump: listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
^C171 packets captured
173 packets received by filter
0 packets dropped by kernel
[au_adfca@ADFCASRV01 webrtc_uae]$ sudo tcpdump -i any -s 00 -w test123.pcap
tcpdump: listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
^C271 packets captured
273 packets received by filter
0 packets dropped by kernel
[au_adfca@ADFCASRV01 webrtc_uae]$ cd script
[au_adfca@ADFCASRV01 script]$ vi services.js
[au_adfca@ADFCASRV01 script]$ cd ..
[au_adfca@ADFCASRV01 webrtc_uae]$ sudo tcpdump -i any -s 00 -w test123.pcap
tcpdump: listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
^C858 packets captured
863 packets received by filter
0 packets dropped by kernel
[au_adfca@ADFCASRV01 webrtc_uae]$ history
    8  netstat -anp | grep turn
    9  sudo netstat -anp | grep turn
   10  sudo service iptables status
   11  sudo kill -9 3174
   12  sudo netstat -anp | grep turn
   13  sudo netstat -anp | grep 3478
   14  sudo netstat -plnt | grep ':80'
   15  telnet 217.165.205.3 3478
   16   sudo netstat -anp | grep turn
   17  nc -uvz 217.165.205.3 3478
   18  cat /etc/network/iptables
   19  cd /usr/local/etc
   20  turnserver
   21  iptables -L
   22  cd
   23  iptables -L
   24  sudo iptables -L
   25  iptables -I INPUT -p udp --dport 3478 -j ACCEPT
   26  sudo iptables -I INPUT -p udp --dport 3478 -j ACCEPT
   27  cd /usr/local/etc
   28  turnserver
   29  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start /usr/local/bin/turnserver 
   30  sudo netstat -anp | grep turn
   31  cat /etc/hosts
   32  hostname -d
   33  hostname -i 
   34  sudo systemctl start coturn
   35  systemctl status coturn
   36  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start /usr/local/bin/turnserver 
   37  turnserver
   38  sudo lsof -i :3478
   39  telnet 10.0.226.98 3478
   40  exit
   41  systemctl status co-tuen
   42  systemctl status co-turn
   43  systemctl status 
   44  which turnserver
   45  systemctl status coturn
   46  sudo systemctl start coturn
   47  cd /usr/local/bin
   48  sudo systemctl start coturn
   49  cd ..
   50  cd etc
   51  sudo systemctl start coturn
   52  systemctl status coturn
   53  sudo lsof -i :3478
   54  telnet 217.165.205.3 3478
   55  sudo netstat -plnt
   56  sudo systemctl start coturn
   57  systemctl status coturn
   58   sudo netstat -anp | grep turn
   59  turnserver
   60  sudo lsof -i :3478
   61   netstat -anv | grep 3478
   62  sudo netstat -plnt | grep ':3478'
   63  nc -uvz 217.165.205.3 3478
   64  sudo netstat -anp | grep turn
   65  clear
   66  nc -uvz 217.165.205.3 3478
   67  sudo netstat -plnt | grep ':3478'
   68  nc -uz 217.165.205.3 3478 
   69  nc -vz 217.165.205.3 3478 
   70  systemctl status coturn
   71  sudo systemctl start coturn
   72  systemctl status coturn
   73  sudo netstat -plnt | grep '3478'
   74  netstat -anv | grep 3478
   75   curl 10.0.226.98:3478
   76   curl 10.0.226.98:443
   77   curl 10.0.226.98:80
   78   curl 10.0.226.98:79
   79   curl 10.0.226.98:3479
   80  cd /usr/local
   81  cd etc
   82  ls
   83  nano turnserver.conf
   84   curl 10.0.226.98:3478
   85  curl 217.165.205.3:443
   86  curl 217.165.205.3:3478
   87  telnet 217.165.205.3 3478
   88  telnet 10.0.226.98 3478
   89  ls
   90  ls -lt
   91  sudo lsof -i :55000
   92  cd  CDR_Dashboard
   93  cd CDR
   94  sudo npm start &
   95  telnet 217.165.205.3:443
   96  telnet 217.165.205.3 443
   97  sudo systemctl status firewalld
   98  sudo lsof -i -P -n | grep LISTEN
   99  sudo /etc/init.d/dns-clean restart
  100  cd
  101  sudo /etc/init.d/dns-clean restart
  102  ip a
  103  sudo systemd-resolve --flush-caches
  104  history | grep -i nameserver
  105  sudo cat /etc/resolv.conf | grep -i nameserver
  106  cd CDR_Dashboard/
  107  ccd CDR
  108  cd CDR
  109  ls
  110  view next.config.js
  111  exit
  112  sudo systemctl start coturn
  113  systemctl status coturn
  114  cd /usr/local
  115  cd etc
  116  ls
  117  nano turnserver.conf
  118  curl https://169.254.169.254/
  119  curl http://169.254.169.254/latest/meta-data/
  120  ls
  121  view next.config.js
  122  nano turnserver.conf
  123  vi turnserver.conf
  124  tcpdump
  125  apt get install tcpdump
  126  yum install tcpdump
  127  cd
  128  vi /etc/yum.repos.d/sdcss.repo
  129  sudo vi /etc/yum.repos.d/sdcss.repo
  130  scp /Users/adfcait/Downloads/adremoteinspection.com/8f1e681b22ec4c0.crt au_adfca@ADFCASRV01:/home/au_adfca/webrtc_uae/ssl-keys/
  131  scp /Users/adfcait/Downloads/adremoteinspection.com/8f1e681b22ec4c0.crt au_adfca@10.0.226.98:/home/au_adfca/webrtc_uae/ssl-keys/
  132  sftp au_adfca@10.0.226.98
  133  sudo yum install tcpdump
  134  tcpdump -s0 port 3478
  135  sftp au_adfca@10.0.226.98
  136  tcpdump -s0 -a port 3478
  137  sftp au_adfca@10.0.226.98
  138  ifconfig
  139  cd /home/au_adfca/webrtc_uae/ssl-keys
  140  ls
  141  cd
  142  cd /usr/local/etc
  143  ls
  144  vi turnserver.conf
  145  sudo su
  146  cd
  147  exit
  148  logout
  149   cd CDR_Dashboard/
  150  cd CDR
  151  sudo npm start &
  152  ps -edf | grep -i 55000
  153  cd /usr/local/etc
  154  ls
  155  cd ..
  156  ls
  157  cd ..
  158  cd webrtc_uae
  159  cd
  160  cd webrtc_ua
  161  cd webrtc_uae
  162  ls
  163  cd ssl-keys
  164  ls
  165  openssl pkcs12 -export -out certificate.pfx -inkey 8f1e681b22ec4c0.pem -in 8f1e681b22ec4c0.crt -certfile gd_bundle-g2-g1.crt
  166  sudo su
  167  exit
  168  ls
  169  pwd
  170  cd webrtc_uae
  171  sudo ~/.nvm/versions/node/v10.14.2/bin/forever npm start
  172  cd
  173  sudo ~/.nvm/versions/node/v10.14.2/bin/forever npm start
  174  pwd
  175  cd /usr/local/etc
  176  ls
  177  cd ..
  178  cd bin
  179  ls
  180  cd
  181  cd webrtc_uae
  182  cd ssl-keys
  183  ls
  184  ls -lt
  185  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  186  cd ..
  187  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  188  ls
  189  cd ssl-keys
  190  ls
  191  ls -lt
  192  ps -edf | grep -i npm
  193  ps -edf | grep -i 443
  194  kill -TERM 22945
  195  kill -TERM 22952
  196  kill -TERM 21949
  197  ps -edf | grep -i 443
  198  kill -TERM 22999
  199  kill -TERM 22999 21949
  200  ps -edf | grep -i 443
  201  ps -edf | grep -i npm
  202  kill -TERM 23019
  203  kill -TERM 21949
  204  ps -edf | grep -i npm
  205  cd ..
  206  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  207  ps -edf | grep -i npm
  208  ps -edf | grep -i 443
  209  ps -edf | grep -i forever
  210  kill -TERM 5157
  211  sudo kill -TERM 5157
  212  ps -edf | grep -i forever
  213  sudo kill -TERM 22370
  214  sudo kill -TERM 23090
  215  sudo kill -TERM 28394
  216  sudo kill -TERM 55062
  217  sudo kill -TERM 55622
  218  ps -edf | grep -i forever
  219  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start npm start
  220  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  221  ps -edf | grep -i forever
  222  ps -edf | grep -i npm
  223  cd webrtc_uae
  224  ls
  225  cd ssl-keys
  226  ls
  227  ls -lt
  228  cd ..
  229  nano app.js
  230  openssl x509 -enddate -noout -in 74ba7ecdd1ae6a16.crt
  231  cd ssl-keys
  232  openssl x509 -enddate -noout -in 74ba7ecdd1ae6a16.crt
  233  exit
  234  cd webrtc_uae
  235  cd ..
  236  cd /usr/local/etc
  237  ls
  238  nano turnserver.conf
  239  sudo su
  240  logout
  241  pwd
  242  cd webrtc_uae
  243  ps -edf | grep -i npm
  244  ps -edf | grep -i 443
  245  ps -edf | grep -i turnserver
  246  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  247  ps -edf | grep -i turnserver
  248  npm start
  249  sudo npm start
  250  ps -edf | grep -i 443
  251  kill -TERM 27454
  252  kill -TERM 27104
  253  ps -edf | grep -i 443
  254  ps -edf | grep -i npm
  255  kill -TERM 27104
  256  kill -TERM 27104 27491
  257  sudo npm start
  258  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  259  ps -edf | grep -i 443
  260  sudo kill -TERM 27626
  261  ps -edf | grep -i 443
  262  ps -edf | grep -i npm
  263  sudo npm start &
  264  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  265  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  266  sudo npm start >> ./logs/npm.log &
  267  ps -edf | grep -i npm
  268  sudo kill -TERM 27950 
  269  sudo kill -TERM 27104
  270  ps -edf | grep -i npm
  271  curl 217.165.205.3:443
  272  ps -edf | grep -i forever
  273  sudo kill -TERM 23594
  274  sudo kill -TERM 27737
  275  sudo kill -TERM 27347
  276  ps -edf | grep -i forever
  277  npm start
  278  sudo npm start
  279  ps -edf | grep -i forever
  280  ps -edf | grep -i npm
  281  sudo lsof -i : 443
  282  sudo ss -lptn 'sport = :443'
  283  sudo kill -TERM 18484
  284  sudo ss -lptn 'sport = :443'
  285  sudo npm start
  286  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  287  sudo ss -lptn 'sport = :4443'
  288  sudo ss -lptn 'sport = :3478'
  289  sudo ss -lptn 'sport = :443'
  290  sudo kill -TERM 28406
  291  sudo ss -lptn 'sport = :443'
  292  sudo kill -TERM 28511
  293  sudo ss -lptn 'sport = :443'
  294  sudo kill -TERM 28542
  295  sudo ss -lptn 'sport = :443'
  296  sudo kill -TERM 28574
  297  sudo ss -lptn 'sport = :443'
  298  sudo kill -TERM 28603
  299  sudo ss -lptn 'sport = :443'
  300  sudo kill -TERM 28632
  301  sudo ss -lptn 'sport = :443'
  302  sudo kill -TERM 28654
  303  sudo ss -lptn 'sport = :443'
  304  sudo kill -TERM 28676
  305  sudo ss -lptn 'sport = :443'
  306  sudo kill -TERM 28700
  307  sudo ss -lptn 'sport = :443'
  308  sudo kill -TERM 28722
  309  sudo ss -lptn 'sport = :443'
  310  npm start
  311  sudo npm start
  312  clear
  313  sudo ss -lptn 'sport = :443'
  314  sudo kill -TERM 28796
  315  sudo ss -lptn 'sport = :443'
  316  sudo kill -TERM 28919
  317  sudo ss -lptn 'sport = :443'
  318  sudo kill -TERM 28941
  319  sudo ss -lptn 'sport = :443'
  320  ls
  321  cd ssl-keys
  322  ls
  323  openssl x509 -enddate -noout -in 74ba7ecdd1ae6a16.pem
  324  ls -lt
  325  cat 74ba7ecdd1ae6a16.crt
  326  cat 74ba7ecdd1ae6a16.pem
  327  cat adremoteinspection_com.pfx
  328  cd ..
  329  openssl x509 -enddate -noout -in 74ba7ecdd1ae6a16.pem
  330  cd ssl-keys
  331  openssl x509 -enddate -noout -in 74ba7ecdd1ae6a16.pem
  332  clear
  333  cd ..
  334  ps -edf | grep -i npm
  335  kill -TERM 27104
  336  sudo ss -lptn 'sport = :443'
  337  kill -TERM 28961
  338  sudo kill -TERM 28961
  339  sudo ss -lptn 'sport = :443'
  340  sudo npm start
  341  ps -edf | grep -i forever
  342  sudo kill -TERM 28399
  343  ps -edf | grep -i forever
  344  sudo ss -lptn 'sport = :443'
  345  sudo kill -TERM 29373
  346  sudo ss -lptn 'sport = :443'
  347  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  348  ps -edf | grep -i forever
  349  sudo kill -TERM 3107
  350  ps -edf | grep -i forever
  351  sudo kill -TERM 4765
  352  sudo kill -TERM 7049
  353  sudo kill -TERM 9284
  354  sudo kill -TERM 17367
  355  sudo kill -TERM 23989
  356  ps -edf | grep -i forever
  357  sudo ss -lptn 'sport = :3478'
  358  sudo kill -TERM 9539
  359  sudo ss -lptn 'sport = :3478'
  360  sudo kill -TERM 9308
  361  sudo ss -lptn 'sport = :3478'
  362  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  363  sudo /usr/local/bin/turnserver &
  364  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start /usr/local/bin/turnserver 
  365  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  366  sudo ss -lptn 'sport = :3478'
  367  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  368  cd ..
  369  ls
  370  ls -lt
  371  cd turnserver-3.2.3.8
  372  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  373  systemctl status coturn
  374  sudo systemctl start coturn
  375  systemctl status coturn
  376  cd /usr/local/bin
  377  ls
  378  cd turnserver
  379  nano turnserver
  380  cd
  381  pwd
  382  ls -lt
  383  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  384  ls
  385  sudo /usr/local/bin/turnserver &
  386  ps -edf | grep -i turnserver
  387  pwd
  388  sudo npm start app.js &
  389  which forever
  390  sudo su
  391  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  392  sudo kill -TERM 29514
  393  sudo ss -lptn 'sport = :443'
  394  sudo kill -TERM 29522
  395  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  396  cd webrtc_uae
  397  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  398  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  399  sudos u
  400  sudo su
  401  cd webrtc_uae
  402  ls
  403  vi app.js
  404  cat app.js
  405  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  406  sudo kill -TERM55010
  407  sudo kill -TERM 55010
  408  sudo kill -TERM 55053
  409  sudo ss -lptn 'sport = :443'
  410  sudo kill -TERM 55060
  411  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  412  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  413  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  414  sudo kill -TERM 60378
  415  sudo ss -lptn 'sport = :443'
  416  vi app.js
  417  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  418  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  419  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  420  sudo su -
  421  cd csr
  422  ls -tlr
  423  openssl req -new -key webrtc.key -out webrtc.csr
  424  ls -ltr
  425  cd webrtc_ae
  426  ls
  427  cd csr
  428  ls
  429  cd ..
  430  ls
  431  ls -ltr
  432  mv 18813aef4495574e.* .csr/
  433  mv 18813aef4495574e.* csr/
  434  ls -ltr
  435  mv gd_bundle-g2-g1.crt csr/
  436  cd csr
  437  ls -ltr
  438  openssl pkcs12 -inkey webrtc.key -in 18813aef4495574e.pem -export -out webrtc.pfx
  439  ls -ltr
  440  cp webrtc.pfx webrtc_uae/ssl-keys
  441  cd ..
  442  cp webrtc.pfx webrtc_uae/ssl-keys
  443  cp csr/webrtc.pfx webrtc_uae/ssl-keys
  444  cd webrtc_uae/ssl-keys/
  445  ls -ltr
  446  cd ..
  447  vi app.js
  448  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  449  sudo kill -TERM 60541
  450  sudo ss -lptn 'sport = :443'
  451  sudo kill -TERM 60548
  452  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  453  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  454  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  455  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  456  ps -edf | grep -i npm
  457  ps -edf | grep -i 443
  458  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  459  sudo kill -TERM 64174
  460  sudo kill -TERM 64245
  461  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  462  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  463  ps -edf | grep -i 443
  464  sudo kill -TERM 64238
  465  sudo kill -TERM 64405
  466  node app.js
  467  ls -ltr
  468  vi app.js
  469  node app.js
  470  vi app.js
  471  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  472  sudo ss -lptn 'sport = :443'
  473  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  474  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  475  cd ssl-keys/
  476  ls -ltr
  477  cd ..
  478  ls -ltr
  479  head -20 app.js
  480  head -22 app.js
  481  vi app.js
  482  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  483  sudo kill -TERM 64759
  484  sudo ss -lptn 'sport = :443'
  485  sudo kill -TERM 64766
  486  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  487  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  488  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  489  node app.js
  490  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  \
  491  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  492  sudo kill -TERM 65093
  493  sudo ss -lptn 'sport = :443'
  494  cd ../csr
  495  ls -ltr
  496  rm -rf webrtc.pfx 
  497  history
  498  openssl pkcs12 -inkey webrtc.key -in 18813aef4495574e.pem -export -out webrtc.pfx
  499  ls -ltr
  500  cp webrtc.pfx ../webrtc_uae/ssl-keys/
  501  ls -ltr
  502  cd ..
  503  cd -
  504  cd webrtc_uae
  505  ls -ltr
  506  cd ssl-keys/
  507  ls -ltr
  508  cd ..
  509  vi app.js
  510  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  511  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  512  node app.js
  513  sudo kill -TERM 65391
  514  sudo ss -lptn 'sport = :443'
  515  node app.js
  516  vi app.js
  517  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  518  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  519  node app.js
  520  sudo kill -TERM 513
  521  ls -ltr
  522  cd ..
  523  cd csr/
  524  ls -ltr
  525  rm -rf webrtc.pfx 
  526  openssl pkcs12 -export -out webrtc.pfx -inkey webrtc.key -in 18813aef4495574e.crt
  527  ls -ltr
  528  cp webrtc.pfx ../webrtc_uae/ssl-keys/
  529  cd ..
  530  cd webrtc_uae
  531  ls -ltr
  532  vi app.js
  533  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  534  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  535  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  536  node app.js
  537  cd ../
  538  cd csr
  539  ls -ltr
  540  rm -rf webrtc.pfx 
  541  ls -ltr
  542  openssl pkcs12 -export -out webrtc.pfx -inkey webrtc.key -in 18813aef4495574e.crt
  543  cd ../webrtc_uae/
  544  ls -ltr
  545  vi app.js
  546  cp ../csr/webrtc.pfx ssl-keys/
  547  ls -ltr
  548  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  549  sudo kill -TERM 844
  550  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  551  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  552  node app.js
  553  vi app.js
  554  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  555  sudo kill -TERM 1303
  556  sudo ss -lptn 'sport = :443'
  557  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  558  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  559  node app.js
  560  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  561  sudo kill -TERM 1433
  562  vi app.js
  563  sudo ss -lptn 'sport = :443'
  564  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  565  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  566  openssl s_client -debug -connect www.adremoteinspection.com:443
  567  logout
  568  ls
  569  ls -lt
  570  sudo ss -lptn 'sport = :443'
  571  sudo ss -lptn 'sport = :3478'
  572  sudo ss -lptn 'sport = :55000'
  573  /home/au_adfca/CDR_Dashboard/CDR
  574  cd /home/au_adfca/CDR_Dashboard/CDR
  575  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  576  nano next.config.js
  577  next start -p 55000
  578  safeq-admin@0.1.0 start /home/au_adfca/CDR_Dashboard/CDR
  579  cd safeq-admin@0.1.0 start /home/au_adfca/CDR_Dashboard/CDR
  580  cd
  581  connect in teams
  582  sudo su
  583  history
  584  sudo ss -lptn 'sport = :443'
  585  sudo ss -lptn 'sport = :55000'
  586  sudo ss -lptn 'sport = :3478'
  587  sudo ss -lptn 'sport = :55000'
  588  ls
  589  cd CDR_Dashboard
  590  cd CDR
  591  sudo npm start &
  592  sudo ss -lptn 'sport = :55000'
  593  sudo lsof -i -P -n | grep LISTEN
  594  cd ..
  595  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  596  cd CDR_Dashboard
  597  cd CDR
  598  sudo forever start  
  599   sudo ~/.nvm/versions/node/v10.14.2/bin/forever npm start
  600  sudo npm start >> /home/au_adfca/webrtc_uae/logs/CDR.log &
  601  cd ..
  602  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start /usr/local/bin/turnserver 
  603  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  604  nc -uvz 217.165.205.3 3478
  605  sudo /usr/local/bin/turnserver &
  606  exit
  607  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  608  sudo lsof -i :3478
  609  ls
  610  cd webrtc_uae
  611  nano app.js
  612  sudo netstat -antulpn
  613  sudo netstat -anulpn
  614  sudo netstat -anulpn | more
  615  sudo netstat -anulp | more
  616  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  617  sudo netstat -anulp | more
  618  sudo netstat -anulp
  619  ls
  620  ps -ax | grep coturn
  621  cd turnserver-3.2.3.8
  622  ls
  623  systemctl status coturn
  624  systemctl restart coturn
  625  sudo su
  626  logout
  627  systemctl status coturn
  628  sudo su
  629  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start /usr/local/bin/turnserver 
  630  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list  
  631  vi /root/.forever/QGgC.log
  632  sudo su
  633  logout
  634  systemctl status coturn
  635  logout
  636  systemctl status coturn
  637  logout
  638  systemctl status coturn
  639  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  640  ps -edf | grep -i 55000
  641  ps -edf | grep -i 443
  642  ps -edf | grep -i 3478
  643  ps -edf | grep -i 80
  644  cd webrtc_uae
  645  ls
  646  cd script
  647  ls
  648  nano services.js
  649  cd ..
  650  cd logs
  651  ls -lt
  652  vi npm.log
  653  pwd
  654  ls
  655  cd webrtc_uae
  656  ls
  657  cd logs
  658  ls
  659  vi CDR.log
  660  vi npm.log
  661  tcpdump
  662  ifconfig
  663  tcpdump -i any -s 00 -w test1.pcap
  664  sudo su
  665  ls
  666  cd webrtc_uae
  667  ls
  668  cd webrtc_uae
  669  ls
  670  sudo -i
  671  cd webrtc_uae
  672  cd scripts
  673  cd script
  674  ls
  675  nano services.js
  676  cd webrtc_uae
  677  ls
  678  cd script
  679  cd ..
  680  history
  681  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  682  sudo kill -TERM 1801
  683  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  684   sudo ss -lptn 'sport = :443'
  685  sudo kill -TERM 43525
  686  cd script
  687  vi services.js
  688  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  689   sudo ~/.nvm/versions/node/v10.14.2/bin/forever npm start
  690  cd ..
  691  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  692  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  693  cd webrtc_uae
  694  cd script
  695  vi services.js
  696  curl 10.93.1.98:3478
  697  curl 10.93.1.98:443
  698  systemctl status coturn
  699  cd ..
  700  cd logs
  701  vi npm.log
  702  cd ..
  703  cd script
  704  vi services.js
  705  cd ..
  706  history
  707  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  708  sudo kill -TERM 47211
  709  sudo ss -lptn 'sport = :443'
  710  sudo kill -TERM 47218
  711  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  712  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  713  cd script
  714  vi service.js
  715  vi services.js
  716  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  717  sudo kill -TERM 48321
  718  sudo ss -lptn 'sport = :443'
  719  sudo kill -TERM 48329
  720  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  721  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  722  cd ..
  723  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  724  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  725  cd script
  726  vi services.js
  727  cd webrtc_uae
  728  cd script
  729  vi services.js
  730  systemctl status coturn
  731  cd webrtc_uae
  732  cd script
  733  vi services.js
  734  cd ..
  735  history
  736  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  737   sudo kill -TERM 48612
  738   sudo ss -lptn 'sport = :443'
  739   sudo kill -TERM 48621
  740  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  741   sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  742  tcpdump -i any port 3478 -s00 -w test1.pcap
  743  sudo tcpdump -i any port 3478 -s00 -w test1.pcap
  744  ls
  745  pwd
  746  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  747  vi services.js
  748  cd script
  749  vi services.js
  750  cd ..
  751  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list 
  752  ls -lrth /var/log/
  753  vim  /var/log/messages
  754  sudo vim  /var/log/messages
  755  sudo netstat -apn|grep 3478
  756  ping adremoteinspection.com
  757  history
  758   sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  759   sudo kill -TERM 39470
  760  sudo ss -lptn 'sport = :443'
  761   sudo kill -TERM 39478
  762   sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  763   sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  764  cd script
  765  vi services.js
  766  cd ..
  767   sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  768   sudo kill -TERM 41021
  769  sudo ss -lptn 'sport = :443'
  770   sudo kill -TERM 41028
  771   sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  772   sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  773  sudo tcpdump -i any -s00 -w test1.pcap
  774  cd script
  775  vi draw.js
  776  cd ..
  777  cd logs
  778  vi npm.log
  779  vi turnserver.log
  780  cd ..
  781  ls
  782  cd turnserver-3.2.3.8
  783  ls
  784  cd ..
  785  cd webrtc_uae
  786  vi services.js
  787  cd script
  788  vi services.js
  789  cd ..
  790  history
  791  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  792   sudo kill -TERM 41257
  793  sudo ss -lptn 'sport = :443'
  794   sudo kill -TERM 41264
  795   sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  796  sudo netstat
  797  sudo netstat -apn|grep 3478
  798  cd script
  799  vi services.js
  800  cd ..
  801   sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  802  cd webrtc_uae
  803  cd script
  804  vi services.js
  805  cd ..
  806  history
  807  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  808  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  809  cd script
  810  vi services.js
  811  cd ..
  812  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  813  sudo -i
  814  cd webrtc_uae
  815  cd script
  816  vi services.js
  817  cd ..
  818  cd webrtc_uae
  819  cd script
  820  vi services.js
  821  cd ..
  822  history
  823  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  824  vi services.js
  825  cd script
  826  vi services.js
  827  cd ..
  828  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  829  vi services.js
  830  cd script
  831  vi services.js
  832  vi draw.js
  833  cd webrtc_uae
  834  cd script
  835  vi services.js
  836  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  837  cd ..
  838  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  839  cd script
  840  vi services.js
  841  cd ...
  842  cd ..
  843  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  844  history
  845  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  846  cd script
  847  vi services.js
  848  cd ..
  849  sudo ~/.nvm/versions/node/v10.14.2/bin/forever list
  850  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  851  cd script
  852  vi services.js
  853  cd ..
  854  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  855  cd script
  856  vi services.js
  857  cd ..
  858  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  859  cd script
  860  vi services.js
  861  cd ..
  862  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  863  nslookup
  864  vi services.js
  865  cd script
  866  vi services.js
  867  curl 217.165.205.3:3478
  868  sudo lsof -i :3478
  869  vi services.js
  870  cd webrtc_uae
  871  cd script
  872  vi services.js
  873  cd ..
  874  tcpdump -i any -s 00 -w test123.pcap
  875  sudo tcpdump -i any -s 00 -w test123.pcap
  876  ls
  877  pwd
  878  cd script
  879  vi services.js
  880  cd ..
  881  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  882  tcpdump -i any -s 00 -w test123.pcap
  883  sudo tcpdump -i any -s 00 -w test123.pcap
  884  cd script
  885  vi services.js
  886  cd ..
  887  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  888  sudo tcpdump -i any -s 00 -w test123.pcap
  889  cd script
  890  vi services.js
  891  cd webrtc_uae
  892  cd script
  893  cd ..
  894  which turnserver
  895  cd /usr/local/bin/turnserver
  896  cd
  897  cd /usr/local/bin/turnserver
  898  cd /usr/local
  899  cd bin
  900  ls
  901  cd turnserver
  902  vi turnserver
  903  cd ..
  904  cd etc
  905  ls
  906  cd system
  907  cd systemd
  908  ls
  909  vi system.conf
  910  vi system
  911  cd
  912  cd webrtc_uae
  913  cd ..
  914  cd etc
  915  cd systemd
  916  cd system
  917  cd etc
  918  logout
  919  cd etc
  920  cd usr
  921  cd ..
  922  cd etc
  923  cd systemd
  924  cd system
  925  ls
  926  cd
  927  cd etc
  928  cd ..
  929  cd etc
  930  ls
  931  vi turnserver.conf
  932  cd ..
  933  cd home
  934  cd usr
  935  cd webrtc_uae
  936  root
  937  logout
  938  pwd
  939  cd webrtc_uae
  940  cd script
  941  vi services.js
  942  cd
  943  cd ..
  944  cd etc
  945  ls
  946  vi turnserver.conf
  947  vi testconf.conf
  948  vi turnserver.conf
  949  cd ..
  950  cd home
  951  cd au_adfca
  952  cd webrtc_uae/script
  953  vi services.js
  954  cd ..
  955  history
  956  sudo ~/.nvm/versions/node/v10.14.2/bin/forever start app.js
  957  history
  958  tcpdump -i any -s 00 -w test123.pcap
  959  sudo tcpdump -i any -s 00 -w test123.pcap
  960  cd
  961  cd ..
  962  cd etc
  963  cd var
  964  cd
  965  cd var
  966  cd ..
  967  cd var
  968  cd log
  969  vi turnserver.log
  970  ls
  971  cd
  972  history
  973  cd usr
  974  pwd
  975  cd
  976  cd usr
  977  cd ..
  978  cd usr
  979  cd local
  980  cd etc
  981  ls
  982  vi turnserver.conf
  983  cd
  984  cd ..
  985  history
  986  cd etc
  987  cd systemd
  988  cd system
  989  ls
  990  vi coturn.service
  991  pwd
  992  cd
  993  history
  994  vi etc
  995  cd etc
  996  cd ..
  997  cd etc
  998  vi turnconfig.conf
  999  vi turnserver.conf
 1000  cd webrtc_uae
 1001  tcpdump -i any -s 00 -w test123.pcap
 1002  sudo tcpdump -i any -s 00 -w test123.pcap
 1003  cd script
 1004  vi services.js
 1005  cd ..
 1006  sudo tcpdump -i any -s 00 -w test123.pcap
 1007  history
[au_adfca@ADFCASRV01 webrtc_uae]$ 
