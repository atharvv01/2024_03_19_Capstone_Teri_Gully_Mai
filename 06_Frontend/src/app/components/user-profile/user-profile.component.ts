import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { BlogService } from "../../services/blog.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css",
})
export class UserProfileComponent {
  userDetails: any;
  userBlogs: any[] = [];

  constructor(
    private userService: UserService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserDetails()
      .then((response) => {
        this.userDetails = response.details;
        this.loadUserBlogs();
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }

  loadUserBlogs(): void {
    this.blogService.getBlogsByAuthorId(this.userDetails._id)
      .then(response => {
        this.userBlogs = response; // Store user's blogs
        console.log(this.userBlogs)
      })
      .catch(error => {
        console.error('Error fetching user blogs:', error);
      });
  }
}
