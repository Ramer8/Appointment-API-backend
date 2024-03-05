USE appointmentApi;

-- Create Roles in Data Base

insert into roles (id, title) values (1, 'user');
insert into roles (id, title) values (2, 'admin');
insert into roles (id, title) values (3, 'super_admin');

-- Create Users in Data Base

insert into users (id, first_name, last_name, email, password_hash, role_id) values (1, 'user', 'user1','user@user.com', '$2b$08$2zgSkukzgwo0iSkHs52bEOIng7O3aJEnoIQnEtwpbd0N0U4L4aSgG', 1); 
insert into users (id, first_name, last_name, email, password_hash, role_id) values (2, 'admin', 'admin2','admin@admin.com', '$2b$08$HC/MvIVsMAei8PM0e55/R.n1Vm5AoT4h/9YtI/s/Fd9uMJNionJO6', 2); 
insert into users (id, first_name, last_name, email, password_hash, role_id) values (3, 'super_admin3', 'super_admin','superadmin@superadmin.com', '$2b$08$v/MwwJzKHJUjXznFwZ85DOrdecUy5nb6NDRRKydzRzsUQWGgkr4B', 3);
