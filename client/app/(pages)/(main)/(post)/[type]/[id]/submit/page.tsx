import SubmitPostContainer from '@/app/container/post/submit';

const SubmitPostPage = async ({
  params,
}: {
  params: Promise<{ type: string; identifier: string }>;
}) => {
  const { type, identifier } = await params;

  return <SubmitPostContainer type={type} identifier={identifier} />;
};

export default SubmitPostPage;
