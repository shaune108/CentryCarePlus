<?php
if (is_authed()) redirect('admin/dashboard');
else redirect('admin/login');
