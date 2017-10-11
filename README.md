# Nuclear Football Mobile Application

Secret Sharing among ‘n’ untrusted users and reconstructing using ‘m’ users.
            1.Use Case Description
            1.1 Objective
            1.2 Summary
                     2.Shamir’s Algorithm 
            2.1 Key Generation
            2.2 Key Reconstruction

# Use Case Description:

1.1 Objective

  Main objective of this application is to share secret among the ‘n’ untrusted users and to rebuild the secret from the ‘m’(<n) users.

1.2 Abstract

  This app allows the admin to create the individual keys for all the ‘n’ trusted users, and the users will be provided with the choice of accepting or rejecting the launch of nuclear codes, when the users select their choices, admin will be reconstructing the key. The generated key should match with his key when the number of accepted users will be greater than the threshold. Nuclear will be launched if the key matches with the master key.
  
# Shamir’s Algorithm:

We are using the Shamir’s scheme to develop this application.
  
2.1 Key Generation

We are using the polynomial generator function to randomly generate the keys for the ‘n’ users from a random polynomial of degree       threshold-1.
 
2.2 Key Reconstruction

We are using the Lagrange Interpolating algorithm to reconstruct the secret by using the threshold value (number of accepted users).
 
