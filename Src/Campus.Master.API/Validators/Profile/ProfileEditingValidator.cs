using Campus.Services.Interfaces.DTO.Profile;
using FluentValidation;

namespace Campus.Master.API.Validators.Profile
{
    public class ProfileEditingValidator : AbstractValidator<ProfileEditingDto>
    {
        public ProfileEditingValidator()
        {
            RuleFor(profile => profile.FirstName)
                .NotNull().WithMessage("First name should not be null")
                .NotEmpty().WithMessage("First name is required")
                .MaximumLength(50).WithMessage("First name should be < 50 symbols")
                .Matches(@"^[a-zA-Z0-9 ]*$").WithMessage(@")(*&^%$#@!~_+-/*':”{}[] are forbidden");
            RuleFor(profile => profile.LastName)
                .NotNull().WithMessage("Last name should not be null")
                .NotEmpty().WithMessage("Last name is required")
                .MaximumLength(50).WithMessage("Last name should be < 50 symbols")
                .Matches(@"^[a-zA-Z0-9 ]*$").WithMessage(@")(*&^%$#@!~_+-/*':”{}[] are forbidden");
        }
    }
}